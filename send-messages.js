import dotenv from 'dotenv'
import Vonage from '@vonage/server-sdk'

dotenv.config()

const vonage = new Vonage({
  applicationId: process.env.VONAGE_APPLICATION_ID,
  privateKey: process.env.VONAGE_APPLICATION_PRIVATE_KEY_PATH
});

const text = "👋Hello from Vonage";

vonage.channel.send(
  { "type": "sms", "number": process.env.TO_NUMBER },
  { "type": "sms", "number": "Vonage" },
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