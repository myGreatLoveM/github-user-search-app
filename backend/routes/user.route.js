import express from 'express'
import { getUserInfoAndRepos } from '../controllers/user.controller.js'

const router = express.Router()

router.get('/profile/:username', getUserInfoAndRepos)




export default router