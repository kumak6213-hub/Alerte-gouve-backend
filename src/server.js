const express = require('express');
const admin = require('firebase-admin');
const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json());

// Remplace par ton vrai fichier firebase si tu l'as
// admin.initializeApp({
//   credential: admin.credential.cert(require('./secrets/firebase.json'))
// });

app.get('/', (req, res) => {
  res.send('Serveur Alerte Gouv OK');
});

// UNE SEULE ROUTE POUR EXPO
app.post('/send-expo-notif', async (req, res) => {
  try {
    const { token, title, body } = req.body;
    
    if (!token) {
      return res.status(400).json({ error: 'Token manquant' });
    }

    const message = {
      to: token,
      sound: 'default',
      title: title || 'ALERTE GOUV',
      body: body || 'Nouvelle alerte',
      priority: 'high',
    };

    const response = await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });

    const data = await response.json();
    console.log('Expo response:', data);
    res.json({ success: true, data });
  } catch (error) {
    console.log('Erreur:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
