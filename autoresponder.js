import dotenv from 'dotenv'
import express from 'express'
import request from 'request'
import Vonage from '@vonage/server-sdk'

dotenv.config()

const {
  json,
  urlencoded
} = express

const app = express()

const vonage = new Vonage({
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
  const number = parseInt(req.body.message.content.text) || 42

  request(`http://numbersapi.com/${number}`, (error, response, body) => {
    if (!error) {
      text = body
    }

    vonage.channel.send({
        "type": "sms",
        "number": req.body.from.number
      }, {
        "type": "sms",
        "number": req.body.to.number
      }, {
        "content": {
          "type": "text",
          "text": text
        }
      },
      (err, responseData) => {
        if (err) {
          console.log("Message failed with error:", err)
        } else {
          console.log(`Message ${responseData.message_uuid} sent successfully.`)
        }
      }
    )

    res.status(200).end()
  })

  app.post('/webhooks/status', (req, res) => {
    console.log(req.body)
    res.status(200).end()
  })
})