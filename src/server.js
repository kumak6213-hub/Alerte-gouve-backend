const express = require('express');
const admin = require('firebase-admin');
const serviceAccount = require('/etc/secrets/firebase.json');

const app = express();
const PORT = process.env.PORT || 10000;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

console.log('Firebase Admin initialisé');

// Route de test pour Render
app.get('/', (req, res) => {
  res.send('Serveur Alerte Gouv OK');
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
