import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI as string;

// Database connection
const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB error:', err);
});

// Create models using the schemas
const ServiceModel = mongoose.model('Service', new mongoose.Schema({
  category: { type: String, required: true },
  description: { type: String, required: true },
  sub_services: [{
    name: { type: String, required: true },
    technologies: [String],
    description: { type: String, required: true }
  }]
}));

const ProductModel = mongoose.model('Product', new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  link: { type: String, required: true }
}));

const ResearchModel = mongoose.model('Research', new mongoose.Schema({
  title: { type: String, required: true },
  year: { type: Number, required: true },
  type: { type: String, required: true },
  description: { type: String, required: true },
  doi: { type: String, required: true }
}));

export {
  connectDB,
  ServiceModel,
  ProductModel,
  ResearchModel
}; 