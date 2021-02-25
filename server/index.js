const dotenv = require('dotenv'),
  path = require('path');
dotenv.config({ path: path.join(__dirname, '../.env') });

const express = require('express');
const cors = require('cors');
const twilio = require('twilio');

// Twilio requirements (texting API)
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const myNumber = process.env.MY_PHONE_NUMBER;
const client = new twilio(accountSid, authToken);
// This also works instead of the previous line:
// const client = require('twilio')(accountSid, authToken);

const app = express();

// Blocks the browser from restricting any data
app.use(cors());

// Welcome page for server
app.get('/', (req, res) => {
  res.send('Server started...');
});

// Twilio Text
app.get('/send-text', (req, res) => {
  // Get variables - passed via query string
  const { recipient, textmessage } = req.query;

  // Send text message
  client.messages
    .create({
      body: textmessage,
      to: +recipient,
      from: myNumber, // Same number from your Twilio account
    })
    .then((message) => console.log(message.body));
});

// Have app listen to specific port
app.listen(4000, () => console.log('Running on Port 4000'));

// Video source: https://www.youtube.com/watch?v=jMIPSWU1JUw
// Getting started with Twilio: https://www.youtube.com/watch?v=rrx4ux-hChw
// Why did the person I sent a message to get duplicate messages? https://support.twilio.com/hc/en-us/articles/223181768-Why-did-the-person-I-sent-a-message-to-get-duplicate-messages-
