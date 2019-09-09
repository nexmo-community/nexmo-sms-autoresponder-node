require('dotenv').config({path:__dirname + '/.env'});

const Nexmo = require('nexmo');

const nexmo = new Nexmo({
  apiKey: process.env.NEXMO_API_KEY,
  apiSecret: process.env.NEXMO_API_SECRET,
  applicationId: process.env.NEXMO_APPLICATION_ID,
  privateKey: process.env.NEXMO_APPLICATION_PRIVATE_KEY_PATH
});

var text = "👋Hello from Nexmo";

nexmo.channel.send(
  { "type": "sms", "number": process.env.TO_NUMBER },
  { "type": "sms", "number": "Nexmo" },
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
