const admin = require('firebase-admin');
const serviceAccount = require('/etc/secrets/firebase.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

console.log('Firebase Admin initialisé');
