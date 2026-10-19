const express=require('express')
const {getAllUsers,createUser,getUserByRole, getUserById} = require('../controller/userController');
const { userUpdate,userDelete } = require('../controller/userPatchAndDelete');

console.log('typeof controller:', typeof userUpdate);
console.log('controller contents:', userUpdate);

const router=express.Router()

router.get('/users',getAllUsers)
router.post('/create',createUser)
router.get('/users/search',getUserByRole)
router.get('/users/:id',getUserById)
router.patch('/users/:id',userUpdate)
router.delete('/users/:id',userDelete)

module.exports=router