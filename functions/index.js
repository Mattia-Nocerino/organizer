// Funzione programmata di Firebase: ogni minuto controlla l'agenda e manda le notifiche dovute.
import { onSchedule } from 'firebase-functions/v2/scheduler';
import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getMessaging } from 'firebase-admin/messaging';
import { promemoria } from './promemoria.js';

initializeApp();

export const avvisi = onSchedule({ schedule: 'every 1 minutes', timeZone: 'Europe/Rome', region: 'europe-west1', memory: '256MiB', maxInstances: 1, retryCount: 0 },
  () => promemoria({ db: getFirestore(), messaging: getMessaging(), appUrl: 'https://mattia-nocerino.github.io/organizer/' }));
