const express = require('express')
const webpack = require('webpack')
const webpackMiddleware = require('webpack-dev-middleware')
const config = require('../build/webpack.config')
const compiler = webpack(config)


const app = express()
app.use(webpackMiddleware(compiler, {
  publicPath: config.output.publicPath
}))

app.get('/api/will1', (req, res) => {
  res.header('Access-COntrol-ALlow-Origin', '\*')
  res.send({
    name: 'will',
    comurl: 'gdev.online'
  })
})

app.listen(3000, () => {
  console.log('Server listening on port 3000');
})