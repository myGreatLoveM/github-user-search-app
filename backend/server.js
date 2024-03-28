import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import passport from 'passport'
import './passport/github.auth.js'
import session from 'express-session'
import { connectDB } from './db/connectDb.js'

import authRoutes from './routes/auth.route.js'
import userRoutes from './routes/user.route.js'
import exploreRoutes from './routes/explore.route.js'

dotenv.config()

const app = express()

app.use(
    session({ secret: 'keyboard cat', resave: false, saveUninitialized: false })
    )
app.use(passport.initialize())
app.use(passport.session())
    
app.use(
  cors({
    // origin: '*',
    // credentials: true,
    // allowedHeaders: [
    //   'Content-Type',
    //   'Authorization',
    //   'X-Requested-With',
    //   'device-remember-token',
    //   'Access-Control-Allow-Origin',
    //   'Origin',
    //   'Accept',
    // ],
  })
)
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/explore', exploreRoutes)

app.listen(5000, async () => {
  console.log('Server listening on port 5000')
  await connectDB()
})

app.get('/', (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'ok',
  })
})
