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
    return res.status(400).json({
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

   if (
    (category !== undefined && typeof category !== "string") ||
    (status !== undefined && typeof status !== "string")
) {
    return res.status(400).json({
        success: false,
        message: "Category and status must be strings"
    });
}
    if(typeof category == "string" && category.trim()===""){
        errors.push("category cannot be empty")
    }
     if(typeof status == "string" && status.trim()===""){
        errors.push("status cannot be empty")
    }

       if(typeof category==="string" && !CATEGORIES.includes(category.toLowerCase()) ){
            errors.push(`category must be one of:${CATEGORIES.join(', ')} `)
        }
    
     if(typeof status ==="string" && !STATUSES.includes(status.toLowerCase()) ){
            errors.push(`status must be one of:${STATUSES.join(', ')} `)
        }

   if(errors.length>0){
    return res.status(400).json({
    success:false,
    message:"Not updated",
    errors
})
}
next()
}

module.exports={validateCreatePost,validateUpdatePost}