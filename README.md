# Organizer di casa

App per il telefono e il computer (PWA): menù settimanale, lista della spesa, faccende, orari di lavoro e agenda unica (cose da fare, impegni, scadenze e ricorrenze come raccolta differenziata e divieti di sosta, con notifiche).

- `app/` è l'app, pubblicata su GitHub Pages da `.github/workflows/pages.yml`.
- I dati stanno su Firebase (Firestore), un documento per utente in `utenti/{uid}`; le regole sono in `firestore.rules`.
- Le notifiche le manda `.github/workflows/promemoria.yml`, che la sera esegue `scripts/promemoria.mjs`.

## Configurazione (una volta sola)

1. **Firebase**: crea un progetto; attiva Authentication → Email/password e Firestore (regione europe-west).
2. **Regole**: Firestore → Regole, incolla il contenuto di `firestore.rules` e pubblica.
3. **Configurazione web**: Impostazioni progetto → Le tue app → app Web; copia i valori in `app/firebase-config.js`.
4. **Chiave notifiche**: Impostazioni progetto → Cloud Messaging → Certificati push web → Genera; copia la chiave pubblica in `VAPID_KEY` di `app/firebase-config.js`.
5. **Chiave del server**: Impostazioni progetto → Account di servizio → Genera nuova chiave privata. Su GitHub: Settings → Secrets and variables → Actions → New repository secret, nome `FIREBASE_SERVICE_ACCOUNT`, valore = tutto il contenuto del file JSON scaricato. Poi cancella il file dal computer.
6. **GitHub Pages**: Settings → Pages → Source: GitHub Actions.

## Uso

- Apri l'app, crea il tuo account (email e password) e accedi. Dopo averlo creato puoi disattivare le nuove registrazioni in Firebase → Authentication → Impostazioni → Azioni utente.
- Su iPhone: Safari → Condividi → Aggiungi alla schermata Home, poi apri l'app da lì. Solo così iOS permette le notifiche.
- Agenda → **Attiva le notifiche qui**, su ogni dispositivo dove vuoi ricevere gli avvisi.
- Per provare: GitHub → Actions → Promemoria → Run workflow manda subito una notifica di prova.
- Account → Importa da file carica i dati esportati dalla versione precedente.
