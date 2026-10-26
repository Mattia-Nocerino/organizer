// Avvisi della sera prima (raccolta differenziata, divieti di sosta): ogni avviso ha i suoi giorni,
// l'eventuale data pari/dispari e l'ora a cui mandare la notifica la sera prima (ora di Roma).
// Gira su GitHub Actions ogni 10 minuti la sera; ogni avviso parte al massimo una volta per sera.
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
const serali = u => u.get('serali') || (u.get('divieti') || []).map(r => ({ id: r.id, titolo: `Sposta la macchina da ${r.via}`, giorni: [r.giorno], parita: r.ord, ora: '22:30' }));

const utenti = await db.collection('utenti').get();
for (const u of utenti.docs){
  const flag = db.doc(`utenti/${u.id}/sistema/avvisi`);
  const inviati = PROVA ? {} : ((await flag.get()).get('inviati') || {});
  const da = PROVA ? [{ id: 'prova', titolo: 'Casa', nota: 'Notifica di prova: le notifiche funzionano.' }]
    : serali(u).filter(r => domani(r) && (r.ora || '21:30') <= adesso && inviati[r.id] !== oggi);
  if (!da.length) continue;

  const disp = await db.collection(`utenti/${u.id}/dispositivi`).get();
  const tokens = disp.docs.map(d => d.get('token')).filter(Boolean);
  if (!tokens.length){ console.log(`${u.id}: nessun dispositivo con le notifiche attive`); continue; }

  for (const r of da){
    const res = await admin.messaging().sendEachForMulticast({
      tokens,
      notification: { title: r.titolo, body: r.nota || `Per domani, ${GIORNI[giorno]} ${data}.` },
      ...(APP_URL ? { webpush: { fcmOptions: { link: APP_URL }, notification: { icon: APP_URL + 'icon-192.png' } } } : {})
    });
    console.log(`${u.id} ${r.id}: ${res.successCount} inviate, ${res.failureCount} fallite`);
    // i dispositivi che non esistono più vengono tolti
    await Promise.all(res.responses.map((x, i) => {
      const code = x.error && x.error.code;
      if (code === 'messaging/registration-token-not-registered' || code === 'messaging/invalid-argument') return disp.docs[i].ref.delete();
    }));
    if (res.successCount) inviati[r.id] = oggi;
  }
  if (!PROVA) await flag.set({ inviati });
}
