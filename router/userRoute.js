const express=require('express')
const {getAllUsers,createUser,getUserByRole, getUserById} = require('../controller/userController');
const { userUpdate,userDelete } = require('../controller/userPatchAndDelete');
const {validateMongoId, validateCreateUser } = require('../middleware/validateUser');
const findUser = require('../middleware/findUseMiddleware');

console.log('typeof controller:', typeof validateCreateUser);
console.log('controller contents:', validateCreateUser);

const router=express.Router()

router.get('/users',getAllUsers)

router.post('/create',validateCreateUser,createUser)

router.get('/users/search',getUserByRole)

router.get('/users/:id',validateMongoId,findUser,getUserById)
router.patch('/users/:id',validateMongoId,findUser,userUpdate)
router.delete('/users/:id',validateMongoId,findUser,userDelete)

module.exports=router