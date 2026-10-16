const connectDB = require("./config/db");
const app=require("./app")

const PORT =3000;

const startServer=async()=>{
    try{
       await connectDB();
       app.listen(PORT,()=>{
    console.log(`Server running on  http://localhost:${PORT}`)
})
    }catch(err){
        console.log("Failed to start the server:",err.message)
        process.exit(1)
    }
}

startServer();