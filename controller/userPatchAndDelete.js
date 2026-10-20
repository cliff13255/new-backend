const User = require("../model/users");
const asyncWrapper = require("../utills/asyncWrapper");

const userUpdate=asyncWrapper(async(req,res)=>{
    const {id}=req.params
    const user=await User.findByIdAndUpdate(id,req.body,{returnDocument:"after",runValidators:true})
    console.log(user)
    res.status(200).json({
        success:true,
         message:"User updated successfuly",
        user
    })
})

const userDelete=asyncWrapper(async(req,res)=>{
    const {id}=req.params
    const deleteUser= await User.findByIdAndDelete(id)
    console.log(deleteUser)
    res.status(204).json({})
})

module.exports={userUpdate,userDelete}

