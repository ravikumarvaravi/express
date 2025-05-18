const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  foodname: {
    type: String,

    
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    enum: ['fastfood', 'northern', 'southern', 'nonveg']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Cart', cartSchema); 