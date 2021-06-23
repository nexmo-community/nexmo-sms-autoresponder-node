const Vonage = require("@vonage/server-sdk");
const express = require("express");
const app = express();
const request = require('request');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(3000);

const vonage = new Vonage({
  apiKey: process.env.VONAGE_API_KEY,
  apiSecret: process.env.VONAGE_API_SECRET,
  applicationId: process.env.VONAGE_APPLICATION_ID,
  privateKey: process.env.VONAGE_APPLICATION_PRIVATE_KEY_PATH
});

app.post('/webhooks/inbound', (req, res) => {
  console.log(req.body)
  const text = "👋Hello from Vonage";
  const number = parseInt(req.body.text) || 42;

  request(`http://numbersapi.com/${number}`, (error, response, body) => {
    if (error) {
      text = "The Numbers API has thrown an error.";
    } else {
      text = body;
    }

    vonage.channel.send(
      { "type": "sms", "number": req.body.msisdn },
      { "type": "sms", "number": req.body.to },
      {
        "content": {
          "type": "text",
          "text": text
        }
      },
      (err, responseData) => {
        if (err) {
          console.log("Message failed with error:", err);
        } else {
          console.log(`Message ${responseData.message_uuid} sent successfully.`);
        }
      }
    );

    res.status(200).end();
  })
});
