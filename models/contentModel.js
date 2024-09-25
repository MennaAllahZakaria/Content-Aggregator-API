const mongoose=require("mongoose");

const contentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    url: { type: String, required: true },
    contentType: { type: String, enum: ['article', 'video', 'image'], required: true },
    source: { type: String, required: true },  // e.g., 'YouTube', 'NYTimes'
    category: { type: String },  // e.g., 'Technology', 'Sports', 'Entertainment'
    publishDate: { type: Date },
    popularity: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
  });
  
  module.exports = mongoose.model('Content', contentSchema);
  