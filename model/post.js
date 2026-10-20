const mongoose=require('mongoose')
const CATEGORIES= ["tech","news","sports","entertainment","education"]
const STATUSES=["archived","draft","published"]

const postSchema= new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Title is required"],
        trim:true,
        minLength:[5,"characters should exceed 5"],
        maxLength:[150,"characters should not exceed 150"]
    },
    content:{
        type:String,
        required:[true,"Conted is required"],
        trim:true,
        minLength:[10,"minimun characters should be 10"]
    },
    category:{
        type:String,
        lowercase:true,
        required:[true,"category is required"],
        enum:{
            values:CATEGORIES,
            message:`Category should include one of these : ${CATEGORIES.join(', ')}`
        }
    },
    status:{
        type:String,
        required:[true,"status is required"],
        lowercase:true,
        trim:true,
        enum:{
            values:STATUSES,
            message:`status should be one of : ${STATUSES.join(', ')}`
        },
        default:"draft"

    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
         ref:"User",
         required:[true,"author is required for this post"]
    }
},
{
    timestamps:true
})

const Post= mongoose.model('Post',postSchema)

module.exports=Post