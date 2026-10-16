const errorHandler=(err,req,res,next)=>{
    console.log(err.message)

    const code=err.statusCode|| 500
    const message =err.message|| "Internal server error"

    res.status(code).json({
        success:false,
        message
    })
}


module.exports=errorHandler