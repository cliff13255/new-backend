const asyncWrapper = require('../utills/asyncWrapper')
const User = require('../model/users')

const getAllUsers=asyncWrapper(async(req,res,next)=>{
    const filter={}
    if(req.query.role) filter.role=req.query.role.toLowerCase();
    if (req.query.name) filter.name = { $regex: req.query.name, $options: 'i' };
    let users= User.find(filter)

    if(req.query.sort){
        const sortBy= (req.query.sort).split(",").join(" ")
        users=users.sort(sortBy)
    }else{
        users=users.sort('-createdAt')
    }

      if(req.query.fields){
        const selectBy= (req.query.fields).split(",").join(" ")
        users=users.select(selectBy)
    }

    const finalUsers= await users

console.log(users)
    res.status(200).json({
        success:true,
        count:users.length,
        finalUsers
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

const getUserByRole=asyncWrapper(async(req,res)=>{
    const {role}=req.query

    const singleUser= await User.find({role})
    console.log(singleUser)
    res.status(200).json({
        success:true,
        user:singleUser
    })
})

const getUserById= asyncWrapper(async(req,res)=>{
    const {id}=req.params
    const userById= await User.findById(id)
    console.log(userById)
    res.status(200).json({
        success:true,
        user:userById
    })
})

module.exports={getAllUsers,createUser,getUserByRole,getUserById}