import express from 'express'
import { getUserTony } from '../controllers/homepage.js'

const router = express.Router()

router.get('/', getUserTony)

export default router