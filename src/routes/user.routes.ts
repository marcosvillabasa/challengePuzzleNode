import {Router} from 'express'
const router = Router()

import {getUsers, createUser} from '../controllers/user.controller'

router.get('/users',getUsers)
// router.get('/users/:id')
router.post('/user', createUser)
// router.('/users')
// router.get('/users')

export default router

