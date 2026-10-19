require('dotenv').config()

const connectDB = require("./config/db");
const app=require("./app")

const PORT =process.env.PORT||3000;

connectDB();
app.listen(PORT,()=>{
    console.log(`Server running on  http://localhost:${PORT}`)
})

// Global safety nets for async 
process.on("unhandledRejection", (err) => {
  console.error("❌ Unhandled Rejection:", err.message);
  process.exit(1);
});
//// Global safety nets for sync
process.on("uncaughtException", (err) => {
  console.error("❌ Uncaught Exception:", err.message);
  process.exit(1);
});