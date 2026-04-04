// ============================================
// FIREBASE CONFIG - GLOBAL STATISTICS
// ============================================
// INSTRUCCIONES PARA CONFIGURAR FIREBASE (GRATIS):
//
// 1. Ve a https://console.firebase.google.com/
// 2. Crea un proyecto nuevo (ej: "be-one-english-stats")
// 3. Ve a "Realtime Database" > "Crear base de datos"
//    - Elige modo de prueba (test mode) para empezar
//    - Selecciona ubicación: eur3 (europe-west)
// 4. Ve a "Configuración del proyecto" (engranaje)
// 5. Baja a "Tus apps" > icono web (</>)
// 6. Registra la app y copia la config
// 7. Pega los valores abajo en firebaseConfig
//
// Para producción, cambia las reglas de seguridad:
// {
//   "rules": {
//     "stats": {
//       ".read": true,
//       ".write": true
//     }
//   }
// }
// ============================================

const FIREBASE_CONFIG = {
  apiKey: "TU_API_KEY_AQUI",
  authDomain: "TU_PROYECTO.firebaseapp.com",
  databaseURL: "https://TU_PROYECTO-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "TU_PROYECTO",
  storageBucket: "TU_PROYECTO.appspot.com",
  messagingSenderId: "TU_SENDER_ID",
  appId: "TU_APP_ID"
};

// ============================================
// FIREBASE TRACKING SERVICE
// ============================================

const FirebaseTracker = {
  initialized: false,
  db: null,

  init() {
    if (this.initialized) return;
    if (!window.firebase) {
      console.warn('Firebase SDK not loaded');
      return;
    }

    try {
      firebase.initializeApp(FIREBASE_CONFIG);
      this.db = firebase.database();
      this.initialized = true;
      console.log('Firebase initialized for analytics');
    } catch (e) {
      console.warn('Firebase init failed:', e.message);
    }
  },

  trackVisit() {
    if (!this.db) return;

    const now = new Date();
    const dateKey = now.toISOString().split('T')[0];
    const hourKey = now.getHours();
    const pageKey = window.location.pathname.split('/').pop() || 'index';

    const updates = {};
    updates[`stats/totalVisits`] = firebase.database.ServerValue.increment(1);
    updates[`stats/dailyVisits/${dateKey}`] = firebase.database.ServerValue.increment(1);
    updates[`stats/hourlyVisits/${dateKey}/${hourKey}`] = firebase.database.ServerValue.increment(1);
    updates[`stats/pageVisits/${pageKey}`] = firebase.database.ServerValue.increment(1);
    updates[`stats/lastVisit`] = now.toISOString();
    updates[`stats/lastVisitor/page`] = pageKey;
    updates[`stats/lastVisitor/time`] = now.toISOString();

    if (!localStorage.getItem('beone_session_id')) {
      const sessionId = Date.now().toString(36) + Math.random().toString(36).substr(2);
      localStorage.setItem('beone_session_id', sessionId);
      updates[`stats/uniqueVisitors`] = firebase.database.ServerValue.increment(1);
    }

    this.db.ref().update(updates).catch(() => {});
  },

  trackClick(type) {
    if (!this.db) return;

    const now = new Date();
    const dateKey = now.toISOString().split('T')[0];

    const updates = {};
    updates[`stats/clicks/${type}`] = firebase.database.ServerValue.increment(1);
    updates[`stats/clicksByDate/${dateKey}/${type}`] = firebase.database.ServerValue.increment(1);
    updates[`stats/lastClick/type`] = type;
    updates[`stats/lastClick/time`] = now.toISOString();

    this.db.ref().update(updates).catch(() => {});
  },

  getStats(callback) {
    if (!this.db) {
      callback(null);
      return;
    }

    this.db.ref('stats').once('value')
      .then(snapshot => callback(snapshot.val()))
      .catch(() => callback(null));
  },

  listenToStats(callback) {
    if (!this.db) {
      callback(null);
      return;
    }

    this.db.ref('stats').on('value', snapshot => {
      callback(snapshot.val());
    });
  },

  resetStats() {
    if (!this.db) return;
    this.db.ref('stats').remove().catch(() => {});
  }
};

// ============================================
// AUTO-INIT ON PAGE LOAD
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  FirebaseTracker.init();
  FirebaseTracker.trackVisit();
});
