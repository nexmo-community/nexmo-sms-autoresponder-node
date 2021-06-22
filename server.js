const express = require("express");
const app = require('express')();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(3000)

app.post('/webhooks/inbound', (req, res) => {
  console.log(req.body);

  res.status(200).end();
});
