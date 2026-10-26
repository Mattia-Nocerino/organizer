// Configurazione del progetto Firebase (non è segreta: identifica il progetto, i dati sono protetti dalle regole di Firestore).
// Letta sia dalla pagina sia dal service worker.
self.FIREBASE_CONFIG = {
  apiKey: '',
  authDomain: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: ''
};
// Chiave pubblica per le notifiche: Firebase → Impostazioni progetto → Cloud Messaging → Certificati push web.
self.VAPID_KEY = '';
