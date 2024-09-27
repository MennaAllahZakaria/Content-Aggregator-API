//CRUD operations of bookmark

const asyncHandler=require("express-async-handler");
const User = require('../models/userModel');
const Content = require('../models/contentModel');
const Bookmark = require('../models/bookMarkModel');
const handlerFactory=require("./handlerFactory");
const ApiError = require("../utils/ApiError")


// @desc    Create bookmark 
// @route   POST  /api/v1/bookmarks
// @access  Private
exports.createBookmark=asyncHandler(async(req,res,next)=>{

    const user=await User.findById(req.user._id);
    const content=await Content.findById(req.body.contentId);
    
    if(!user ||!content){
        return next(new ApiError('Invalid user or content.', 404));
    }
    
    if(user.bookmarks.includes(content._id)){
        return next(new ApiError('Content already bookmarked.', 400));
    }
    const bookmark=await Bookmark.create({
        userId: user._id,
        contentId: content._id,
    });
    
    user.bookmarks.push(content._id);
    await user.save();
    
    res.status(201).json({
        message: 'Bookmark created successfully.',
        data: bookmark,
    });

});


// @desc    Get specific Bookmark by id
// @route   GET /api/v1/bookmarks/:id
// @access  Private/admin
exports.getBookmark =handlerFactory.getOne(Bookmark);

// @desc    Get list of bookmarks of looged user
// @route   GET /api/v1/bookmarks
// @access  Private/admin
exports.getBookmarksForLoggedUser=asyncHandler(async(req, res, next)=>{
    const user=await User.findById(req.user._id);
    if(!user){
        return next(new ApiError('Invalid user.', 404));
    }
    const bookmarks=await Bookmark.find({userId:user._id});
    
    res.status(200).json({
        results:bookmarks.length,
        data: bookmarks 
    });
});

// @desc    Delete specific Bookmark
// @route   DELETE /api/v1/bookmarks/:id
// @access  Private/admin
exports.deleteBookmark=asyncHandler(async(req,res,next)=>{
    const user=await User.findById(req.user._id);
    const content=await Content.findById(req.params.id);
    
    if(!user ||!content){
        return next(new ApiError('Invalid user or content.', 404));
    }
    
    if(!user.bookmarks.includes(content._id)){
        return next(new ApiError('Content not bookmarked.', 404));
    }
    
    const bookmark=await Bookmark.findOneAndDelete({userId: user._id, contentId: content._id});
    
    user.bookmarks=user.bookmarks.filter(bookmarkId=>!bookmarkId.equals( content._id));
    await user.save();
    
    res.status(200).json({
        message: 'Bookmark deleted successfully.',
        data: user,
    });

});

