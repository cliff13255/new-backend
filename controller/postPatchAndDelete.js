const Post = require("../model/post");
const asyncWrapper = require("../utills/asyncWrapper");

const postUpdated=asyncWrapper(async(req,res)=>{
        console.log("Looking for post with ID:", req.params.id, "with data:", req.body); 
    const {id}=req.params
    const data=req.body
   
    const updatedPost= await Post.findByIdAndUpdate(id,data,{returnDocument:"after",runValidators:true})

        if (!updatedPost) {
        return res.status(404).json({ success: false, message: "Post not found" });
    }

    console.log(updatedPost)

    res.status(200).json({
        success:true,
        message:"Post updated successfuly",
        updatedPost
    })
})

const postDeleted=asyncWrapper(async(req,res)=>{
    const {id}=req.params

    const deletedPost=await Post.findByIdAndDelete(id)

        if (!deletedPost) {
        return res.status(404).json({ success: false, message: "Post not found" });
    }

    console.log(deletedPost)


    res.status(204).json({})
})

module.exports={postUpdated,postDeleted}