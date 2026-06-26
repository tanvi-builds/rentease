const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true, enum: ['Furniture', 'Appliances'] },
  price: { type: Number, required: true },
  deposit: { type: Number, required: true },
  image: { type: String, default: '' },
  description: { type: String, default: '' },
  available: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);