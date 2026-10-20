const express= require('express')
const errorHandler = require('./middleware/errorHandler')
const userRoute=require('./router/userRoute')
const postRoute = require('./router/postRoute')
const app=express()

app.use(express.json())

//main route for testing
app.get('/',(req,res)=>{res.status(200).json({success:true,message:"New api works well"})})

//routes
app.use('/api/',userRoute)

app.use('/api/post/',postRoute)

//invalid routes
app.use((req,res,next)=>{
    console.log("Route not found")
    res.status(404).json({
        success:false,
        message:"Route not found"
    })
})
//global errorhandler
app.use(errorHandler)
module.exports=app