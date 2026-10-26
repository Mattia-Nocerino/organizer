// Manda la notifica "sposta la macchina" alle 22:30 (ora di Roma) la sera prima di un divieto di sosta.
// Gira su GitHub Actions ogni 10 minuti la sera; manda al massimo un avviso per sera a ogni utente.
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
const minuti = Number(parts.hour) * 60 + Number(parts.minute);
if (!PROVA && minuti < 22 * 60 + 30){ console.log(`Ora di Roma ${parts.hour}:${parts.minute}: troppo presto`); process.exit(0); }

const dom = new Date(Date.UTC(+parts.year, +parts.month - 1, +parts.day + 1));
const giorno = (dom.getUTCDay() + 6) % 7, data = dom.getUTCDate();
const divietoDomani = r => Number(r.giorno) === giorno && (data % 2 === 0) === (r.ord === 'pari');

const utenti = await db.collection('utenti').get();
for (const u of utenti.docs){
  const vie = (u.get('divieti') || []).filter(divietoDomani).map(r => r.via);
  if (!PROVA && !vie.length) continue;
  const flag = db.doc(`utenti/${u.id}/sistema/avvisi`);
  if (!PROVA && (await flag.get()).get('ultimo') === oggi) continue;

  const disp = await db.collection(`utenti/${u.id}/dispositivi`).get();
  const tokens = disp.docs.map(d => d.get('token')).filter(Boolean);
  if (!tokens.length){ console.log(`${u.id}: nessun dispositivo con le notifiche attive`); continue; }

  const body = PROVA ? 'Notifica di prova: le notifiche funzionano.'
    : `Domani ${GIORNI[giorno]} ${data} divieto di sosta in ${vie.join(' e in ')}.`;
  const res = await admin.messaging().sendEachForMulticast({
    tokens,
    notification: { title: PROVA ? 'Casa' : '🚗 Sposta la macchina', body },
    ...(APP_URL ? { webpush: { fcmOptions: { link: APP_URL }, notification: { icon: APP_URL + 'icon-192.png' } } } : {})
  });
  console.log(`${u.id}: ${res.successCount} inviate, ${res.failureCount} fallite`);
  // i dispositivi che non esistono più vengono tolti
  await Promise.all(res.responses.map((r, i) => {
    const code = r.error && r.error.code;
    if (code === 'messaging/registration-token-not-registered' || code === 'messaging/invalid-argument') return disp.docs[i].ref.delete();
  }));
  if (!PROVA && res.successCount) await flag.set({ ultimo: oggi });
}
