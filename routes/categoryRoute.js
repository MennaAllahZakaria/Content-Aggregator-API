const express=require('express');

const router=express.Router();
    

const {
    createCategory,
    getCategory,
    getCategories,
    updateCategory,
    deleteCategory

    
}=require("../services/categoryService");

const{
    protect,
    allowedTo
}=require("../services/authService");

router.use(protect);

router.route('/')
                .post(createCategory)
                .get(getCategories);

router.route('/:id')
                    .put(updateCategory)
                    .get(getCategory)
                    .delete(deleteCategory);



module.exports=router;