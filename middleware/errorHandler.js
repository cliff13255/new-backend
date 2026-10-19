const errorHandler=(err,req,res,next)=>{
    console.error(err.stack)

    if(err.code===11000){
        const field= Object.keys(err.keyValue).join(',')
        return res.status(400).json({
            success:false,
            message:`${field} already exists`
        })
    }

    if(err.name==="validationError"){
        const field=Object.values(err.errors).map(e=>e.message)
        return res.status(400).json({
            success:false,
            message:field.join(',')
        })
    }

    const code=err.statusCode|| 500
    const message =err.message|| "Internal server error"

    res.status(code).json({
        success:false,
        message
    })
}


module.exports=errorHandler