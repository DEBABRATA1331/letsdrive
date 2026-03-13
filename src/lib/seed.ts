import dbConnect from './dbConnect';
import Car from '@/models/Car';

export const premiumCars = [
  {
    name: 'Tesla Model S Plaid',
    brand: 'Tesla',
    type: 'Electric',
    pricePerDay: 15000,
    fuelType: 'Electric',
    transmission: 'Automatic',
    seatingCapacity: 5,
    rating: 4.9,
    features: ['Autopilot', 'Ludicrous Mode', 'Glass Roof', '17" Touchscreen'],
    images: ['/images/tesla.png'],
    description: 'The quickest accelerating car in production today.',
  },
  {
    name: 'Porsche 911 Carrera',
    brand: 'Porsche',
    type: 'Sport',
    pricePerDay: 25000,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    seatingCapacity: 2,
    rating: 5.0,
    features: ['Sport Chrono', 'Active Suspension', 'Bose Sound', 'Turbocharged'],
    images: ['/images/porsche.png'],
    description: 'The definitive sport car experience.',
  },
  {
    name: 'Range Rover HSE',
    brand: 'Land Rover',
    type: 'SUV',
    pricePerDay: 12000,
    fuelType: 'Diesel',
    transmission: 'Automatic',
    seatingCapacity: 7,
    rating: 4.8,
    features: ['Panoramic Sunroof', 'All-Wheel Drive', 'Leather Seats', 'Air Suspension'],
    images: ['/images/range-rover.png'],
    description: 'Luxury meets off-road capability.',
  },
  {
    name: 'BMW M4 Competition',
    brand: 'BMW',
    type: 'Luxury',
    pricePerDay: 18000,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    seatingCapacity: 4,
    rating: 4.7,
    features: ['M Sport Exhaust', 'Carbon Fiber Trim', 'Heads-up Display', 'Harman Kardon'],
    images: ['/images/bmw.png'],
    description: 'Uncompromising performance and elegance.',
  },
  {
    name: 'Mercedes-Benz S-Class',
    brand: 'Mercedes',
    type: 'Luxury',
    pricePerDay: 22000,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    seatingCapacity: 5,
    rating: 4.9,
    features: ['Executive Rear Seats', 'Burmester Sound', 'Air Balance', 'Active Parking'],
    images: ['/images/mercedes-s-class.png'],
    description: 'The pinnacle of luxury and technological innovation.',
  },
  {
    name: 'Ferrari Roma Spider',
    brand: 'Ferrari',
    type: 'Convertible',
    pricePerDay: 45000,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    seatingCapacity: 2,
    rating: 5.0,
    features: ['V8 Turbo', 'Retractable Hard Top', 'Carbon Ceramic Brakes', 'F1-Trac'],
    images: ['/images/ferrari-roma.png'],
    description: 'La Nuova Dolce Vita - elegance and performance in the open air.',
  },
  {
    name: 'Lamborghini Huracán',
    brand: 'Lamborghini',
    type: 'Sport',
    pricePerDay: 55000,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    seatingCapacity: 2,
    rating: 5.0,
    features: ['V10 Engine', 'LDVI System', 'Carbon Skin', 'Magneto-rheological Suspension'],
    images: ['/images/lamborghini-huracan.png'],
    description: 'The perfect fusion of technology and design.',
  },
];

export async function seedCars() {
  try {
    console.log('Starting seeding process...');
    await dbConnect();
    // The provided code edit snippet for dbConnect logging is intended for the dbConnect.js file itself,
    // not for insertion here. Assuming dbConnect.js will be updated separately.
    // The existing dbConnect() call will handle its own logging.

    await Car.deleteMany({}); // Clear existing
    await Car.insertMany(premiumCars);
    console.log('Database seeded with premium cars!');
    return true;
  } catch (error) {
    console.error('Seeding failed:', error);
    throw error; // Re-throw so caller knows it failed
  }
}
