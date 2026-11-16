/**
 * Configuration web Firebase (projet beautybooker-25c9d).
 * Ces valeurs sont publiques par nature : la sécurité repose sur les règles Firestore (firestore.rules).
 */
export const firebaseConfig = {
  apiKey: 'AIzaSyBYb1ox1cEK8pMJn1m-FmSdxUlzb-B4f68',
  authDomain: 'beautybooker-25c9d.firebaseapp.com',
  projectId: 'beautybooker-25c9d',
  storageBucket: 'beautybooker-25c9d.firebasestorage.app',
  messagingSenderId: '302900814653',
  appId: '1:302900814653:web:67f2034d5a26b733065b54',
  measurementId: 'G-JR7WC4KXVG',
};

/** Comptes autorisés à ouvrir l'espace privé (doit correspondre à firestore.rules) */
export const adminEmails = ['rodmafer6@gmail.com'];
