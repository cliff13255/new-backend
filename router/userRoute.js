const express=require('express')
const {getAllUsers,createUser,getUserByRole, getUserById} = require('../controller/userController')

console.log('typeof controller:', typeof getUserById);
console.log('controller contents:', getUserById);

const router=express.Router()

router.get('/users',getAllUsers)
router.post('/create',createUser)
router.get('/users/search',getUserByRole)
router.get('/users/:id',getUserById)

module.exports=router