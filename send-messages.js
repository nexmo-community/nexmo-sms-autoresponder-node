import dotenv from 'dotenv'
import Vonage from '@vonage/server-sdk'
import SMS from '@vonage/server-sdk/lib/Messages/SMS.js'

dotenv.config()

const vonage = new Vonage({
  apiKey: process.env.VONAGE_API_KEY,
  apiSecret: process.env.VONAGE_API_SECRET
});

const text = "👋Hello from Vonage";

vonage.messages.send(
  new SMS(text, process.env.TO_NUMBER, "Vonage"),
  (err, data) => {
    if (err) {
      console.error("Message failed with error:", err);
    } else {
      console.log(`Message ${data.message_uuid} sent successfully.`);
    }
  }
);