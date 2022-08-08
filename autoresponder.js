import dotenv from 'dotenv'
import express from 'express'
import request from 'request'
import Vonage from '@vonage/server-sdk'
import SMS from '@vonage/server-sdk/lib/Messages/SMS.js'

dotenv.config()

const {
  json,
  urlencoded
} = express

const app = express()

const vonage = new Vonage({
  apiKey: process.env.VONAGE_API_KEY,
  apiSecret: process.env.VONAGE_API_SECRET,
  applicationId: process.env.VONAGE_APPLICATION_ID,
  privateKey: process.env.VONAGE_APPLICATION_PRIVATE_KEY_PATH
})

app.use(json())
app.use(urlencoded({
  extended: true
}))

app.listen(3000, () => {
  console.log('Server listening at http://localhost:3000')
})

app.post('/webhooks/inbound', (req, res) => {
  console.log(req.body)

  let text = "The Numbers API has thrown an error."
  const number = parseInt(req.body.text) || 42

  request(`http://numbersapi.com/${number}`, (error, response, body) => {
    if (!error) {
      text = body
    }

    vonage.messages.send(
      new SMS(text, req.body.to, req.body.from),
      (err, data) => {
        if (err) {
          console.error("Message failed with error:", err);
        } else {
          console.log(`Message ${data.message_uuid} sent successfully.`);
        }
      }, res.status(200).end()
    );

    app.post('/webhooks/status', (req, res) => {
      console.log(req.body)
      res.status(200).end()
    })
  })
})