const express=require('express');
const { createPost,getAllPosts,getPostById } = require('../controller/postController');
const { postUpdated,postDeleted } = require('../controller/postPatchAndDelete');
const {validateMongoId } = require('../middleware/validateUser');
const { validateCreatePost,validateUpdatePost } = require('../middleware/validatePost');


console.log('typeof controller:', typeof postUpdated);
console.log('controller contents:', postUpdated);

const router=express.Router()

router.get('/',getAllPosts)
router.get('/:id',validateMongoId,getPostById)

router.post('/',validateCreatePost,createPost)

router.patch('/:id',validateMongoId,validateUpdatePost,postUpdated)
router.delete('/:id',validateMongoId,postDeleted)



module.exports=router