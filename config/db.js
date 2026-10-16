const mongoose=require('mongoose')

const connectDB =async()=>{
    try{
        const conn=await mongoose.connect('mongodb://127.0.0.1:27017/new-backend')

        console.log(`MongoDB Connected: ${conn.connection.host}`)
           console.log(`MongoDB name: ${conn.connection.name}`)
    }catch(err){
        console.log(`❌Error: ${err.message}`)
        process.exit(1)
    }
}

module.exports= connectDB