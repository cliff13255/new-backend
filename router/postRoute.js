const express=require('express');
const { createPost,getAllPosts,getPostById } = require('../controller/postController');
const { postUpdated,postDeleted } = require('../controller/postPatchAndDelete');


console.log('typeof controller:', typeof postUpdated);
console.log('controller contents:', postUpdated);

const router=express.Router()

router.get('/',getAllPosts)
router.get('/:id',getPostById)

router.post('/',createPost)

router.patch('/:id',postUpdated)
router.delete('/:id',postDeleted)



module.exports=router