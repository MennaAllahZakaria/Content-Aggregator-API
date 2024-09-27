//CRUD operations of Categorys

const axios = require('axios');
const asyncHandler=require("express-async-handler"); 
const Category = require('../models/categoryModel');
const handlerFactory=require("./handlerFactory");
const ApiError = require("../utils/ApiError");


// @desc    Create a new Category
// @route   GET /api/v1/categories
// @access  Private/admin
exports.createCategory = handlerFactory.createOne(Category)

// @desc    Get specific Categorys by id
// @route   GET /api/v1/categories/:id
// @access  Private/admin
exports.getCategory = handlerFactory.getOne(Category);

// @desc    Get list of Categories
// @route   GET /api/v1/categories
// @access  Private/admin
exports.getCategories = handlerFactory.getAll(Category);

// @desc    Update specific Category
// @route   PUT /api/v1/categories/:id
// @access  Private/admin
exports.updateCategory =handlerFactory.updateOne(Category)

// @desc    Delete specific Category
// @route   DELETE /api/v1/categories/:id
// @access  Private/admin
exports.deleteCategory =handlerFactory.deleteOne(Category);
