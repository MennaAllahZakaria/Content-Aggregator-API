const express=require('express');

const router=express.Router();
    

const {
    createBookmark,
    getBookmark,
    getBookmarksForLoggedUser,
    deleteBookmark
    
}=require("../services/bookMarkService");

const{
    protect,
    allowedTo
}=require("../services/authService");

router.use(protect);

router.post('/',createBookmark);

router.get('/',getBookmarksForLoggedUser);

router.route('/:id')
                    .get(getBookmark)
                    .delete(deleteBookmark);


module.exports=router;