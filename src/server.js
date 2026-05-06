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
