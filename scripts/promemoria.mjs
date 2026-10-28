// Promemoria dell'agenda, su GitHub Actions ogni 10 minuti (orari di Roma). Per ogni volta in cui una voce capita:
// - un avviso per ogni anticipo scelto (all'ora, 30 minuti, 1 ora… prima); senza ora si conta dalle 9;
// - l'eventuale avviso della sera prima, all'ora scelta (raccolta differenziata, divieti di sosta);
// salvo che quella volta sia stata silenziata dalla notifica. Ogni avviso parte una volta sola.
// PROVA=1 manda subito una notifica di prova a tutti i dispositivi registrati.
import admin from 'firebase-admin';

admin.initializeApp({ credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)) });
const db = admin.firestore();
const PROVA = process.env.PROVA === '1';
const APP_URL = process.env.APP_URL || undefined;

const parts = Object.fromEntries(new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Europe/Rome', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23'
}).formatToParts(new Date()).map(p => [p.type, p.value]));
const oggi = `${parts.year}-${parts.month}-${parts.day}`;
const adesso = `${parts.hour}:${parts.minute}`;

// minuti "di calendario" (ora di Roma trattata come UTC): bastano per confrontare orari
const minuti = (d, h = '00:00') => Date.UTC(+d.slice(0, 4), +d.slice(5, 7) - 1, +d.slice(8, 10), +h.slice(0, 2), +h.slice(3, 5)) / 60000;
const ora = minuti(oggi, adesso);
const giornoDopo = (d, n) => new Date((minuti(d) + n * 1440) * 60000).toISOString().slice(0, 10);
const domani = giornoDopo(oggi, 1);
const durata = m => m >= 2160 ? `${Math.round(m / 1440)} giorni` : m >= 1380 ? 'un giorno' : m >= 90 ? `${Math.round(m / 60)} ore` : m >= 50 ? 'un’ora' : `${Math.max(5, Math.round(m / 5) * 5)} minuti`;
const giornoTxt = d => d === oggi ? 'Oggi' : d === domani ? 'Domani' : new Date(d + 'T12:00:00Z').toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'UTC' });
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);

// stesse regole dell'app
const settIl = (v, d) => { const x = new Date(d + 'T12:00:00Z'); return (v.giorni || []).map(Number).includes((x.getUTCDay() + 6) % 7) && (!v.parita || (x.getUTCDate() % 2 === 0) === (v.parita === 'pari')); };
function occorrenze(v, da, a){
  if (v.ripeti === 'sett'){ const out = []; for (let d = da; d <= a; d = giornoDopo(d, 1)) if (settIl(v, d)) out.push(d); return out; }
  return v.data && !v.fatto && v.data >= da && v.data <= a ? [v.data] : [];
}
// dati salvati prima dell'agenda unica
function agenda(u){
  if (Array.isArray(u.get('agenda'))) return u.get('agenda');
  const A = [];
  for (const i of u.get('impegni') || []) A.push({ id: i.id, titolo: i.titolo, data: i.data, ora: i.ora || '', avvisi: i.avvisi || [], muto: i.muto ? i.data : '' });
  for (const s of u.get('scadenze') || []) A.push({ id: s.id, titolo: s.nome, data: s.data, ripeti: Number(s.ricorrenza) ? String(s.ricorrenza) : '', avvisi: [0] });
  for (const r of u.get('serali') || []) A.push({ id: r.id, titolo: r.titolo, ripeti: 'sett', giorni: r.giorni, parita: r.parita, sera: r.ora || '21:30', note: r.nota || '' });
  return A;
}

const utenti = await db.collection('utenti').get();
for (const u of utenti.docs){
  const flag = db.doc(`utenti/${u.id}/sistema/avvisi`);
  const inviati = PROVA ? {} : ((await flag.get()).get('inviati') || {});
  const da = [];
  if (PROVA) da.push({ titolo: 'Casa', body: 'Notifica di prova: le notifiche funzionano.' });
  else for (const v of agenda(u)){
    const avvisi = (v.avvisi || []).map(Number);
    if (!avvisi.length && !v.sera) continue;
    const anticipo = Math.max(0, ...avvisi) / 1440;
    for (const d of occorrenze(v, oggi, giornoDopo(oggi, Math.ceil(anticipo) + 1))){
      if (v.muto === d) continue;
      const quando = `${d} ${v.ora || ''}`, t = minuti(d, v.ora || '09:00'), segna = {};
      // la sera prima
      if (v.sera && d === domani && adesso >= v.sera && inviati[`${v.id}@${d}@sera`] !== quando){
        segna[`${v.id}@${d}@sera`] = quando;
        da.push({ titolo: v.titolo, body: v.note || `Per domani, ${new Date(d + 'T12:00:00Z').toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', timeZone: 'UTC' })}.`, segna });
        continue;
      }
      // gli anticipi scattati (all'ora: fino a un'ora dopo, nel caso GitHub sia in ritardo)
      const scattati = avvisi.filter(m => ora >= t - m && ora < t + (m ? 0 : 60) && inviati[`${v.id}@${d}@${m}`] !== quando);
      if (!scattati.length) continue;
      for (const m of scattati) segna[`${v.id}@${d}@${m}`] = quando;
      const altri = avvisi.some(m => ora < t - m);
      const quandoTxt = giornoTxt(d) + (v.ora ? ` alle ${v.ora}` : '');
      da.push({
        titolo: v.titolo,
        body: (ora >= t ? `${cap(quandoTxt)}.` : `${cap(quandoTxt)}, tra ${durata(t - ora)}.`) + (altri ? ' Tocca per silenziare i prossimi avvisi.' : ''),
        link: altri && APP_URL ? `${APP_URL}?silenzia=${encodeURIComponent(v.id)}&il=${d}#agenda` : APP_URL,
        segna
      });
    }
  }
  if (!da.length) continue;

  const disp = await db.collection(`utenti/${u.id}/dispositivi`).get();
  const tokens = disp.docs.map(d => d.get('token')).filter(Boolean);
  if (!tokens.length){ console.log(`${u.id}: nessun dispositivo con le notifiche attive`); continue; }

  for (const r of da){
    const link = r.link || APP_URL;
    const res = await admin.messaging().sendEachForMulticast({
      tokens,
      notification: { title: r.titolo, body: r.body },
      ...(link ? { webpush: { fcmOptions: { link }, notification: { icon: APP_URL + 'icon-192.png' } } } : {})
    });
    console.log(`${u.id} ${r.titolo}: ${res.successCount} inviate, ${res.failureCount} fallite`);
    // i dispositivi che non esistono più vengono tolti
    await Promise.all(res.responses.map((x, i) => {
      const code = x.error && x.error.code;
      if (code === 'messaging/registration-token-not-registered' || code === 'messaging/invalid-argument') return disp.docs[i].ref.delete();
    }));
    if (res.successCount) Object.assign(inviati, r.segna);
  }
  // via i segni delle volte passate
  for (const [k, v] of Object.entries(inviati)) if (String(v).slice(0, 10) < oggi) delete inviati[k];
  if (!PROVA) await flag.set({ inviati });
}
