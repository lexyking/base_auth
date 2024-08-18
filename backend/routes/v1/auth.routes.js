import express from 'express'
import { logoutController, singUpController, loginController } from '../../controllers/v1/auth.controllers.js'

const router = express.Router()

router.get('/signup', singUpController)
router.get('/login', loginController)
router.get('/logout', logoutController)

export default router