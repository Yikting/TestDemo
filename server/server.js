const express = require('express')
const app = express()

app.get('/api/will1', (req, res) => {
  res.header('Access-COntrol-ALlow-Origin', '\*')
  res.send({
    name: 'will',
    comurl: 'gdev.online'
  })
})

app.listen(3000, () => {
  console.log('app listen 300 port');
})