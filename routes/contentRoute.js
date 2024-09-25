const express=require('express');

const router=express.Router();
    

const {
    fetchFromUserUrl,
    getContent,
    searchContent,
    filterContent,
    getContents,
    updateContent,
    deleteContent,
    
}=require("../services/contentService");

const{
    protect,
    allowedTo
}=require("../services/authService");

router.use(protect);

router.post('/fetch',fetchFromUserUrl);

router.get('/',getContents);

router.get('/search',searchContent);

router.get('/filter',filterContent);

router.get('/',getContents);

router.route('/:id').get(getContent)
                    .put(updateContent)
                    .delete(deleteContent);




module.exports=router;