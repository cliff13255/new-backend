const Post = require("../model/post");
const asyncWrapper = require("../utills/asyncWrapper");

const createPost=asyncWrapper(async(req,res)=>{
    const post = await Post.create(req.body)
console.log(post)

res.status(201).json({
    success:true,
    message:"user created successfuly",
    post
})


})

const getAllPosts=asyncWrapper(async(req,res)=>{
    const {status,author,category,title}=req.query
    const filter={}

    if(title) filter.title=title.toLowerCase()
    if(category) filter.category=category.toLowerCase()
    if(status) filter.status=status.toLowerCase()
    if(author) filter.author= author
    
    const posts= await Post.find(filter).populate('author',"name email role")
    console.log(posts)

    res.status(200).json({
        success:true,
        posts
    })
})

const getPostById= asyncWrapper(async(req,res)=>{
    const {id}=req.params

    const posts=await Post.findById(id).populate("author","name email role")

    if(!posts){
        return res.status(404).json({success:false,message:"user not found"})
    }
    
    console.log(posts)
    res.status(200).json({
        success:true,
        posts
    })


})

module.exports={createPost,getAllPosts,getPostById}