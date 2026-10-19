const validator=require('validator')
const mongoose=require('mongoose')
const ROLES=["admin","student","teacher","parent"]

const validateMongoId= (req,res,next)=>{
    const {id}=req.params
     if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({
            success:false,
            message:`Invalid Id format:${id}`
        })
     }


     next()
}

const validateCreateUser=(req,res,next)=>{
    const {name,email,role}=req.body
    const errors=[]
    
    if(!name) errors.push("Name is required...")
    if(!email) errors.push("Email is required...")
    if(!role) errors.push("Role is required...")  
        
    if(email && !validator.isEmail(email) ) {
        errors.push("Invalid email formart")
    }   

    if(role && !ROLES.includes(role.toLowerCase()) ){
        errors.push(`Role must be one of:${ROLES.join(', ')} `)
    }

    console.log(errors)

    if(errors.length>0){
        return res.status(400).json({
            success:false,
            message:"validation failed",
            errors
        })
    }

    next()
}

module.exports={validateMongoId,validateCreateUser}