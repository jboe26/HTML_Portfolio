import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import nodemailer from 'nodemailer';
import fetch from 'node-fetch';


const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Root route to confirm server is alive
app.get('/', (req, res) => {
  res.send('Contact form backend is running ✅');
});

app.post('/send-email', (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'joshboep@gmail.com',
      pass: 'yioi uvfy vphe dlxt', // App password
    },
  });

  const mailOptions = {
    from: email,
    to: 'joshboep@gmail.com',
    subject: `New message from ${name}`,
    text: message,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error('Email error:', err);
      return res.status(500).json({ message: 'Something went wrong. Please try again later.' });
    }
    res.status(200).json({ message: 'Email sent successfully!' });
  });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
