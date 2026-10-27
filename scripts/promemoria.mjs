// Promemoria, su GitHub Actions ogni 10 minuti (orari di Roma):
// - avvisi della sera prima (raccolta differenziata, divieti di sosta): giorni, data pari/dispari e ora; una volta per sera;
// - impegni: un avviso per ogni anticipo scelto (24 ore, 2 ore…), finché l'impegno non è silenziato; senza ora conta dalle 9;
// - scadenze: alle 9 del primo giorno di preavviso e del giorno stesso.
// PROVA=1 manda subito una notifica di prova a tutti i dispositivi registrati.
import admin from 'firebase-admin';

admin.initializeApp({ credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)) });
const db = admin.firestore();
const PROVA = process.env.PROVA === '1';
const APP_URL = process.env.APP_URL || undefined;
const GIORNI = ['lunedì','martedì','mercoledì','giovedì','venerdì','sabato','domenica'];

const parts = Object.fromEntries(new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Europe/Rome', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23'
}).formatToParts(new Date()).map(p => [p.type, p.value]));
const oggi = `${parts.year}-${parts.month}-${parts.day}`;
const adesso = `${parts.hour}:${parts.minute}`;
const dom = new Date(Date.UTC(+parts.year, +parts.month - 1, +parts.day + 1));
const giorno = (dom.getUTCDay() + 6) % 7, data = dom.getUTCDate();
const domani = r => (r.giorni || []).map(Number).includes(giorno) && (!r.parita || (data % 2 === 0) === (r.parita === 'pari'));
// vecchio formato
// minuti "di calendario" (ora di Roma trattata come UTC): bastano per confrontare orari
const minuti = (d, h = '00:00') => Date.UTC(+d.slice(0, 4), +d.slice(5, 7) - 1, +d.slice(8, 10), +h.slice(0, 2), +h.slice(3, 5)) / 60000;
const ora = minuti(oggi, adesso);
const durata = m => m >= 90 ? `${Math.round(m / 60)} ore` : m >= 50 ? 'un’ora' : `${Math.max(5, Math.round(m / 5) * 5)} minuti`;
const quando = i => {
  const g = i.data === oggi ? 'Oggi' : minuti(i.data) - minuti(oggi) === 1440 ? 'Domani' : new Date(i.data + 'T12:00:00Z').toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'UTC' });
  return g + (i.ora ? ` alle ${i.ora}` : '');
};

const serali = u => u.get('serali') || (u.get('divieti') || []).map(r => ({ id: r.id, titolo: `Sposta la macchina da ${r.via}`, giorni: [r.giorno], parita: r.ord, ora: '22:30' }));

const utenti = await db.collection('utenti').get();
for (const u of utenti.docs){
  const flag = db.doc(`utenti/${u.id}/sistema/avvisi`);
  const inviati = PROVA ? {} : ((await flag.get()).get('inviati') || {});
  const da = [];
  if (PROVA) da.push({ titolo: 'Casa', body: 'Notifica di prova: le notifiche funzionano.' });
  else {
    for (const r of serali(u)) if (domani(r) && (r.ora || '21:30') <= adesso && inviati[r.id] !== oggi)
      da.push({ titolo: r.titolo, body: r.nota || `Per domani, ${GIORNI[giorno]} ${data}.`, segna: { [r.id]: oggi } });

    for (const i of u.get('impegni') || []){
      if (i.muto || !(i.avvisi || []).length) continue;
      const quandoStr = `${i.data} ${i.ora || '09:00'}`;
      const t = minuti(i.data, i.ora || '09:00'); if (ora >= t) continue;
      const scattati = i.avvisi.filter(m => ora >= t - m && inviati[`${i.id}@${m}`] !== quandoStr);
      if (!scattati.length) continue;
      const altri = i.avvisi.some(m => ora < t - m);
      da.push({
        titolo: i.titolo,
        body: `${quando(i)}, tra ${durata(t - ora)}.` + (altri ? ' Tocca per silenziare i prossimi avvisi.' : ''),
        link: altri && APP_URL ? `${APP_URL}?silenzia=${encodeURIComponent(i.id)}#agenda` : APP_URL,
        segna: Object.fromEntries(scattati.map(m => [`${i.id}@${m}`, quandoStr]))
      });
    }

    if (adesso >= '09:00') for (const s of u.get('scadenze') || []){
      const giorni = (minuti(s.data) - minuti(oggi)) / 1440, pre = Number(s.preavviso) || 0;
      const k = `scad:${s.id}`;
      if (!(giorni === 0 || (pre > 0 && giorni === pre)) || inviati[k] === oggi) continue;
      da.push({ titolo: s.nome, body: giorni === 0 ? 'Scade oggi.' : giorni === 1 ? 'Scade domani.' : `Scade tra ${giorni} giorni.`, segna: { [k]: oggi } });
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
  // via i segni dei giorni passati
  for (const [k, v] of Object.entries(inviati)) if (String(v).slice(0, 10) < oggi) delete inviati[k];
  if (!PROVA) await flag.set({ inviati });
}
