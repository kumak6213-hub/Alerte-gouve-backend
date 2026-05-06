const admin = require('firebase-admin');
const express = require('express');
require('dotenv').config();

const app = express();
app.use(express.json());

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  })
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Le serveur marche!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur lancé sur port ${PORT}`));
const admin = require('firebase-admin');
const express = require('express');
require('dotenv').config();

const app = express();
app.use(express.json());

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
  })
});

const db = admin.firestore();

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Le serveur marche!' });
});

app.post('/subscribe', async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) return res.status(400).json({ error: 'Token FCM manquant' });
    
    await db.collection('tokens').doc(token).set({
      token: token,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    res.json({ success: true, message: 'Abonné aux alertes' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/send-alert', async (req, res) => {
  try {
    const { title, body } = req.body;
    if (!title || !body) return res.status(400).json({ error: 'Titre et message requis' });

    const tokensSnapshot = await db.collection('tokens').get();
    const tokens = tokensSnapshot.docs.map(doc => doc.id);
    
    if (tokens.length === 0) return res.status(400).json({ error: 'Aucun téléphone abonné' });

    const message = {
      notification: { title, body },
      tokens: tokens
    };

    const response = await admin.messaging().sendEachForMulticast(message);
    
    res.json({ success: true, sent: response.successCount, failed: response.failureCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Serveur lancé sur port ${PORT}`);
});
