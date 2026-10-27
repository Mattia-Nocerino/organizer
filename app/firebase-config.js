// Configurazione del progetto Firebase (non è segreta: identifica il progetto, i dati sono protetti dalle regole di Firestore).
// Letta sia dalla pagina sia dal service worker.
self.FIREBASE_CONFIG = {
  apiKey: 'AIzaSyCzeysxaGwQAN6twroKekTXc1sg0rgc2_4',
  authDomain: 'organizer-bb3dc.firebaseapp.com',
  projectId: 'organizer-bb3dc',
  storageBucket: 'organizer-bb3dc.firebasestorage.app',
  messagingSenderId: '343203539160',
  appId: '1:343203539160:web:aca4a61934ab2f8c554fad'
};
// Chiave pubblica per le notifiche: Firebase → Impostazioni progetto → Cloud Messaging → Certificati push web.
self.VAPID_KEY = 'BMwr9Omcb_o0__0NsRi9jpPL_s6mcUUcHhHN9s12NCgvFsv6FpfsvwBdmjdNWxBUnYX1AjWTihr00kml56_Hk_I';
