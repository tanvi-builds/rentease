const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

const products = [
  { name: "3-Seater Sofa", category: "Furniture", price: 599, deposit: 1000, image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400", available: true },
  { name: "King Size Bed", category: "Furniture", price: 799, deposit: 1500, image: "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=400", available: true },
  { name: "Dining Table", category: "Furniture", price: 499, deposit: 800, image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=400", available: false },
  { name: "Wardrobe", category: "Furniture", price: 699, deposit: 1200, image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=400", available: true },
  { name: "Study Table", category: "Furniture", price: 399, deposit: 600, image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400", available: true },
  { name: "Bookshelf", category: "Furniture", price: 299, deposit: 500, image: "https://images.unsplash.com/photo-1594620302200-9a762244a156?w=400", available: true },
  { name: "Refrigerator", category: "Appliances", price: 699, deposit: 1200, image: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=400", available: true },
  { name: "Washing Machine", category: "Appliances", price: 599, deposit: 1000, image: "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=400", available: true },
  { name: "Smart TV 43 inch", category: "Appliances", price: 799, deposit: 1500, image: "https://images.unsplash.com/photo-1461151304267-38535e780c79?w=400", available: false },
  { name: "Air Conditioner", category: "Appliances", price: 899, deposit: 1800, image: "https://png.pngtree.com/thumb_back/fh260/background/20250525/pngtree-a-white-air-conditioner-with-digital-display-image_17336786.jpg", available: true },
  { name: "Microwave", category: "Appliances", price: 349, deposit: 600, image: "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=400", available: true },
  { name: "Water Purifier", category: "Appliances", price: 299, deposit: 500, image: "https://img.freepik.com/premium-photo/water-purifier-with-white-background-high-quality-u_889056-17871.jpg", available: true },
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('MongoDB Connected for seeding...');
    await Product.deleteMany({});
    console.log('Old products cleared');
    await Product.insertMany(products);
    console.log('✅ 12 products seeded successfully!');
    mongoose.disconnect();
  })
  .catch((err) => {
    console.log('Error:', err);
    mongoose.disconnect();
  });