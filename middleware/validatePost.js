const mongoose=require('mongoose')
const CATEGORIES= ["tech","news","sports","entertainment","education"]
const STATUSES=["archived","draft","published"]

const validateCreatePost=(req,res,next)=>{
    const errors=[]
    const {title,content,author,category,status}=req.body

    if(!title) errors.push("Title is required");
    if(!content) errors.push("Content is required");
    if(!status) errors.push("Status is required");
    if(!category) errors.push("Category is required");
    if(!author) errors.push("Author is required");

       if(category && !CATEGORIES.includes(category.toLowerCase()) ){
            errors.push(`category must be one of:${CATEGORIES.join(', ')} `)
        }
    
     if(status && !STATUSES.includes(status.toLowerCase()) ){
            errors.push(`status must be one of:${STATUSES.join(', ')} `)
        }

        console.log(errors)
if(errors.length>0){
    res.status(400).json({
    success:false,
    message:"Not validated",
    errors
})
}

next()
}
 const validateUpdatePost=(req,res,next)=>{
    const errors=[]
    const {category,status}=req.body

       if(category && !CATEGORIES.includes(category.toLowerCase()) ){
            errors.push(`category must be one of:${CATEGORIES.join(', ')} `)
        }
    
     if(status && !STATUSES.includes(status.toLowerCase()) ){
            errors.push(`status must be one of:${STATUSES.join(', ')} `)
        }
next()
 }
module.exports={validateCreatePost,validateUpdatePost}