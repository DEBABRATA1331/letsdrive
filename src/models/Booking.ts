import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  car: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
  pickupLocation: { type: String, required: true },
  dropLocation: { type: String, required: true },
  pickupDate: { type: Date, required: true },
  dropDate: { type: Date, required: true },
  totalPrice: { type: Number, required: true },
  paymentStatus: { 
    type: String, 
    enum: ['Pending', 'Paid', 'Failed'], 
    default: 'Pending' 
  },
  status: { 
    type: String, 
    enum: ['Confirmed', 'Cancelled', 'Completed', 'In Progress'], 
    default: 'Confirmed' 
  },
  stripeSessionId: { type: String },
}, { timestamps: true });

export default mongoose.models.Booking || mongoose.model('Booking', BookingSchema);
