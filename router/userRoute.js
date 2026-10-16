const express=require('express')
const {getAllUsers,createUser} = require('../controller/userController')

console.log('typeof controller:', typeof getAllUsers);
console.log('controller contents:', getAllUsers);

const router=express.Router()

router.get('/users',getAllUsers)
router.post('/create',createUser)

module.exports=router