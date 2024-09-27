//CRUD operations of Contents

const axios = require('axios');
const asyncHandler=require("express-async-handler"); 
const Content = require('../models/contentModel');
const handlerFactory=require("./handlerFactory");
const ApiError = require("../utils/ApiError");


// @desc    Check if is the url is valid or not
const isValidUrl = (string) => {
    return new URL(string)?true:false;
    };

// @desc    Feach content from Url 
// @route   POST  /api/v1/contents/fetch
// @access  Private

exports.fetchFromUserUrl=asyncHandler(async(req,res,next)=>{
    const { url, contentType, headers, params } = req.body;

    // Validate URL format (basic check)
    if (!url || !isValidUrl(url)) {
        return next(new ApiError('Invalid URL provided.',400));
    }

    // Set up the request options
    const requestOptions = {
      headers: headers || {},   // Optional headers provided by the user
      params: params || {},     // Optional query parameters
    };

    // Make the request to the user-provided URL
    const response = await axios.get(url, requestOptions);

    if ( !response){
        return next(new ApiError('Failed to fetch content from URL.', 404));
    }

    // Process the response and store in MongoDB
    const content = {
        title: response.data.title || 'Untitled',
        description: response.data.description || 'No description available',
        url: url,
        contentType: contentType || 'unknown',  // User-defined content type
        source: new URL(url).hostname,          // Extract domain from URL
        publishDate: new Date(),                // Assign current time as publish date
    };

    // Save to MongoDB
    const savedContent = await Content.create(content);
    if ( !savedContent){
        return next(new ApiError('Failed to save content to database.', 500));
    }

    res.status(201).json({
      message: 'Content fetched and saved successfully.',
      content: savedContent,
    });

});

// @desc    Get specific content by id
// @route   GET /api/v1/contents/:id
// @access  Private
exports.getContent =handlerFactory.getOne(Content);

// @desc    Search for specific content 
// @route   GET /api/v1/contents/search
// @access  Private

exports.searchContent = asyncHandler(async (req, res, next) => {
    const { query } = req.query; // Extracting the 'query' parameter from the query string

    // Check if the query parameter is provided
    if (!query) {
        return next(new ApiError('No search query provided.', 404));
    }

    // Find contents matching the query in title, description, source, or contentType
    const contents = await Content.find({
        $or: [
            { title: { $regex: query, $options: 'i' } },
            { description: { $regex: query, $options: 'i' } },
            { source: { $regex: query, $options: 'i' } },
            { contentType: { $regex: query, $options: 'i' } },
        ]
    }).sort({ publishDate: -1 });

    // Handle case where no contents were found
    if (!contents || contents.length === 0) {
        return next(new ApiError('No content found.', 404));
    }

    // Respond with the results
    res.status(200).json({ 
        results: contents.length,
        data: contents
    });
});



// @desc    Filter Content by Date or Popularity
// @route   GET /api/v1/contents/filter
// @access  Private
exports.filterContent = asyncHandler(async (req, res, next) => {
    const { filterType, startDate, endDate } = req.query;

    let filter = {};

    // If filterType is provided, set the filtering conditions
    if (filterType) {
        // Filter by publish date range
        if (filterType === 'date') {
            filter.publishDate = {};
            if (startDate) {
                filter.publishDate.$gte = new Date(startDate);  // Start date (greater than or equal)
            }
            if (endDate) {
                filter.publishDate.$lte = new Date(endDate);  // End date (less than or equal)
            }
        } 
        // Filter by popularity (e.g., number of views, likes, or other metrics)
        else if (filterType === 'popularity') {
            filter.popularity = { $gte: 0 };  // This could represent a baseline for popularity (e.g., views >= 0)
        }
    }

    // Find content that matches the filter, and sort by publishDate in descending order
    const contents = await Content.find(filter).sort({ publishDate: -1 });

    // Check if contents were found
    if (!contents || contents.length === 0) {
        return next(new ApiError('No content found.', 404));
    }

    // Return the filtered content
    res.status(200).json({ 
        results: contents.length,
        data: contents
    });
});


// @desc    Get list of contents
// @route   GET /api/v1/contents
// @access  Private/admin
exports.getContents = handlerFactory.getAll(Content);

// @desc    Update specific content
// @route   PUT /api/v1/contents/:id
// @access  Private/admin
exports.updateContent =handlerFactory.updateOne(Content)

// @desc    Delete specific content
// @route   DELETE /api/v1/contents/:id
// @access  Private/admin
exports.deleteContent =handlerFactory.deleteOne(Content);
