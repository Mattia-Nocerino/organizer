// Prova manuale da GitHub Actions: stessa logica della funzione programmata di Firebase.
// PROVA=1 manda subito una notifica di prova a tutti i dispositivi registrati.
import admin from 'firebase-admin';
import { promemoria } from '../functions/promemoria.js';

admin.initializeApp({ credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)) });
await promemoria({ db: admin.firestore(), messaging: admin.messaging(), prova: process.env.PROVA === '1', appUrl: process.env.APP_URL || undefined });
