import express from 'express'
import dotenv from 'dotenv';
import path from 'path'
import { registerRoutes } from './routes'
import { setEnvironment } from './config/set-env'
import { connectToDB } from './config/db'
const app = express()
const port = process.env.PORT || 3000

dotenv.config();
setEnvironment(app)
connectToDB()
registerRoutes(app)

app.route('/*').get((req, res) => {
  if(process.env.NODE_ENV !== 'production') {
    return res.send('Running server in development mode.')
  } else {
    return res.sendFile(path.join(__dirname + '/../dist/index.html'))
  }
})

app.listen(port, () => {
  console.log(`ACDesigns server running in ${process.env.NODE_ENV} mode.`)
})