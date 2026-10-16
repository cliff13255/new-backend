const asyncWrapper = require('../utills/asyncWrapper')
const User = require('../model/users')

const getAllUsers=asyncWrapper(async(req,res,next)=>{
    const users=await User.find()
console.log(users)
    res.status(200).json({
        success:true,
        count:users.length,
        users
    })
    
})

const createUser=asyncWrapper(async(req,res)=>{
    const createUser=await User.create(req.body)
    console.log(createUser)

    res.status(201).json({
        success:true,
        createUser
    })
})

module.exports={getAllUsers,createUser}