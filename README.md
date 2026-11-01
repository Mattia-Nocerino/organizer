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
- Per provare: GitHub → Actions → Promemoria → Run workflow, spunta "Manda una notifica di prova adesso".

### Promemoria puntuali (funzione Firebase)

Le esecuzioni programmate di GitHub (`schedule`) partono spesso con ore di ritardo, quindi i promemoria li manda una funzione programmata di Firebase (`functions/`), ogni minuto, ora di Roma. Una volta sola:

1. Firebase → Impostazioni → Utilizzo e fatturazione → passa al piano **Blaze**. Con questo uso si resta nella quota gratuita; conviene impostare un avviso di budget di 1 €.
2. Google Cloud → IAM (`https://console.cloud.google.com/iam-admin/iam?project=organizer-bb3dc`) → l'account `firebase-adminsdk-…@organizer-bb3dc.iam.gserviceaccount.com` → Modifica → aggiungi i ruoli **Editor**, **Cloud Functions Admin** e **Cloud Run Admin**.
3. GitHub → Actions → **Pubblica la funzione dei promemoria** → Run workflow.

La logica è in `functions/promemoria.js`, la stessa usata da Actions → Promemoria per la notifica di prova.
