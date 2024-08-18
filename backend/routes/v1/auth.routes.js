import express from 'express'
import { logout, singUp, login } from '../../controllers/v1/auth.controllers.js'

const router = express.Router()

router.post('/signup', singUp)
router.post('/login', login)
router.post('/logout', logout)

export default router