import mongoose from 'mongoose';

const CarSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  type: { 
    type: String, 
    required: true, 
    enum: ['Luxury', 'SUV', 'Sedan', 'Sport', 'Electric', 'Convertible'] 
  },
  pricePerDay: { type: Number, required: true },
  fuelType: { 
    type: String, 
    required: true, 
    enum: ['Petrol', 'Diesel', 'Electric', 'Hybrid'] 
  },
  transmission: { 
    type: String, 
    required: true, 
    enum: ['Automatic', 'Manual'] 
  },
  seatingCapacity: { type: Number, required: true },
  rating: { type: Number, default: 5 },
  features: { type: [String], default: [] },
  images: { type: [String], required: true },
  availability: { type: Boolean, default: true },
  description: { type: String },
}, { timestamps: true });

export default mongoose.models.Car || mongoose.model('Car', CarSchema);
