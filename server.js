const app = require('express')()
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

app.listen(3000)

app.post('/webhooks/inbound', (req, res) => {
  console.log(req.body);

  res.status(200).end();
});
