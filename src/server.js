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
const express = require('express');
const admin = require('firebase-admin');
const serviceAccount = require('/etc/secrets/firebase.json');

const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json());

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

console.log('Firebase Admin initialisé');

app.get('/', (req, res) => {
  res.send('Serveur Alerte Gouv OK');
});

// Route pour envoyer une notif
app.post('/send-notif', async (req, res) => {
  const { token, title, body } = req.body;
  
  const message = {
    notification: { title, body },
    token: token
  };

  try {
    const response = await admin.messaging().send(message);
    res.json({ success: true, response });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
