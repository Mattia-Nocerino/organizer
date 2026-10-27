// Accesso, sincronizzazione su Firestore e notifiche push.
// Senza configurazione Firebase l'app resta locale (salvataggio solo sul dispositivo).
const V = '10.12.2';
const cfg = self.FIREBASE_CONFIG || {};
const app = window.casaApp;
const $ = s => document.querySelector(s);

if (cfg.apiKey && cfg.projectId) start();

async function start(){
  const [{ initializeApp }, A, F, M] = await Promise.all([
    import(`https://www.gstatic.com/firebasejs/${V}/firebase-app.js`),
    import(`https://www.gstatic.com/firebasejs/${V}/firebase-auth.js`),
    import(`https://www.gstatic.com/firebasejs/${V}/firebase-firestore.js`),
    import(`https://www.gstatic.com/firebasejs/${V}/firebase-messaging.js`)
  ]);
  const fb = initializeApp(cfg);
  const auth = A.getAuth(fb);
  const db = F.initializeFirestore(fb, { localCache: F.persistentLocalCache({ tabManager: F.persistentMultipleTabManager() }) });
  let user = null;

  /* ---------- accesso ---------- */
  const err = msg => { $('#lErr').textContent = msg; };
  const MSG = {
    'auth/invalid-credential': 'Email o password non corrette.',
    'auth/wrong-password': 'Email o password non corrette.',
    'auth/user-not-found': 'Nessun account con questa email.',
    'auth/email-already-in-use': 'Esiste già un account con questa email: usa Accedi.',
    'auth/weak-password': 'La password deve avere almeno 6 caratteri.',
    'auth/invalid-email': 'Email non valida.',
    'auth/too-many-requests': 'Troppi tentativi, riprova tra qualche minuto.',
    'auth/network-request-failed': 'Nessuna connessione.',
    'auth/admin-restricted-operation': 'La creazione di nuovi account è disattivata.'
  };
  const fail = e => err(MSG[e && e.code] || 'Qualcosa non ha funzionato, riprova.');
  const creds = () => [$('#lEmail').value.trim(), $('#lPass').value];
  $('#loginForm').addEventListener('submit', e => {
    e.preventDefault(); err('');
    const [em, pw] = creds(); if (!em || !pw) return err('Inserisci email e password.');
    A.signInWithEmailAndPassword(auth, em, pw).catch(fail);
  });
  $('#lNew').addEventListener('click', () => {
    err(''); const [em, pw] = creds(); if (!em || !pw) return err('Inserisci email e una password di almeno 6 caratteri.');
    A.createUserWithEmailAndPassword(auth, em, pw).catch(fail);
  });
  $('#lReset').addEventListener('click', () => {
    const [em] = creds(); if (!em) return err('Scrivi prima la tua email.');
    A.sendPasswordResetEmail(auth, em).then(() => err('Ti ho mandato una email per reimpostare la password.')).catch(fail);
  });

  A.onAuthStateChanged(auth, u => {
    user = u;
    $('#login').hidden = !!u;
    $('#account').hidden = !u;
    if (!u){ app.detachCloud(); return; }
    const ref = F.doc(db, 'utenti', u.uid);
    app.attachCloud({
      set: obj => F.setDoc(ref, obj),
      onSnapshot: (next, onErr) => F.onSnapshot(ref, s => next({ exists: s.exists(), data: () => s.data() }), onErr)
    });
  });

  /* ---------- account: importa, esporta, esci ---------- */
  $('#account').addEventListener('click', () => {
    app.openDlg(`<h2>Account</h2>
      <p class="muted small">${user ? user.email.replace(/[&<>"']/g, '') : ''}</p>
      <div class="bar"><button type="button" class="btn small ghost" id="aNot">Attiva le notifiche qui</button></div>
      <div class="bar"><button type="button" class="btn small ghost" id="aExp">Esporta i dati</button>
      <label class="btn small ghost" style="cursor:pointer">Importa da file<input type="file" id="aImp" hidden></label></div>
      <div class="dlg-actions"><button type="button" class="btn danger" id="aOut">Esci</button><span class="spacer"></span><button type="button" class="btn" id="aCls">Chiudi</button></div>`, d => {
      d.querySelector('#aCls').addEventListener('click', app.closeDlg);
      d.querySelector('#aNot').addEventListener('click', () => { app.closeDlg(); attivaNotifiche(); });
      d.querySelector('#aOut').addEventListener('click', () => { app.closeDlg(); A.signOut(auth); });
      d.querySelector('#aExp').addEventListener('click', () => {
        const blob = new Blob([JSON.stringify(app.getState(), null, 1)], { type: 'application/json' });
        const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'organizer-casa.json'; a.click();
        setTimeout(() => URL.revokeObjectURL(a.href), 5000);
      });
      d.querySelector('#aImp').addEventListener('change', async e => {
        const file = e.target.files[0]; if (!file) return;
        let o;
        try {
          const t = (await file.text()).replace(/^\uFEFF/, '').trim();
          o = JSON.parse(t.slice(t.indexOf('{')));
          if (o && o.data && o.data.piatti) o = o.data;
          if (!o || typeof o !== 'object' || !Array.isArray(o.piatti)) throw new Error('mancano i piatti');
        } catch (x){
          app.closeDlg();
          app.toast(`“${file.name}” non è il file giusto (${file.size} byte): ${x.message}`.slice(0, 160));
          return;
        }
        app.closeDlg();
        if (!(await app.ask(`Sostituire tutti i dati attuali con quelli del file? (${o.piatti.length} piatti, ${(o.faccende || []).length} faccende)`, 'Importa'))) return;
        try { app.importa(o); app.toast('Dati importati'); }
        catch (x){ app.toast('Importazione non riuscita: ' + x.message); }
      });
    });
  });

  /* ---------- notifiche push ---------- */
  async function attivaNotifiche(){
    if (!user) return app.toast('Accedi per attivare le notifiche');
    const standalone = matchMedia('(display-mode: standalone)').matches || navigator.standalone;
    if (!('Notification' in window) || !(await M.isSupported())){
      return app.toast(/iPhone|iPad/.test(navigator.userAgent) && !standalone
        ? 'Su iPhone prima aggiungi l’app alla schermata Home, poi aprila da lì e riprova'
        : 'Questo browser non supporta le notifiche');
    }
    if (!self.VAPID_KEY) return app.toast('Notifiche non ancora configurate');
    const perm = await Notification.requestPermission();
    if (perm !== 'granted') return app.toast('Notifiche non permesse: puoi attivarle dalle impostazioni del browser');
    try {
      const reg = await navigator.serviceWorker.ready;
      const token = await M.getToken(M.getMessaging(fb), { vapidKey: self.VAPID_KEY, serviceWorkerRegistration: reg });
      const h = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(token));
      const id = [...new Uint8Array(h)].map(b => b.toString(16).padStart(2, '0')).join('').slice(0, 40);
      await F.setDoc(F.doc(db, 'utenti', user.uid, 'dispositivi', id), { token, ua: navigator.userAgent.slice(0, 200), aggiornato: new Date().toISOString() });
      app.toast('Notifiche attive su questo dispositivo');
    } catch (e){ app.toast('Non sono riuscito ad attivare le notifiche'); }
  }
  window.casaCloud = { attivaNotifiche };
}
