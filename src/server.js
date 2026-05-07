app.post('/send-expo-notif', async (req, res) => {
  const { token, title, body } = req.body;
  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ to: token, title, body, sound: 'default' }),
  });
  res.json({ success: true });
});const express = require('express');
const admin = require('firebase-admin');
const serviceAccount = require('/etc/secrets/firebase.json');

const app = express();
const PORT = process.env.PORT || 10000;
app.use(express.json());

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

app.get('/', (req, res) => {
  res.send('Serveur Alerte Gouv OK');
});

app.post('/send-expo-notif', async (req, res) => {
  const { token, title, body } = req.body;
  
  const message = {
    to: token,
    sound: 'default',
    title: title,
    body: body,
    priority: 'high',
  };

  try {
    const response = await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(message),
    });
    const data = await response.json();
    console.log('Expo response:', data);
    res.json({ success: true, data });
  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});
app.post('/send-expo-notif', async (req, res) => {
  try {
    const { token, title, body } = req.body;
    
    if (!token) {
      return res.status(400).json({ error: 'Token manquant' });
    }

    const message = {
      to: token,
      sound: 'default',
      title: title || 'Alerte Gouv',
      body: body || 'Nouvelle alerte',
    };

    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
app.post('/send-expo-notif', async (req, res) => {
  const { token, title, body } = req.body;
  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ to: token, title, body, sound: 'default' }),
  });
  res.json({ success: true });
});
