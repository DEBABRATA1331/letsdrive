import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Car from '@/models/Car';

import { premiumCars } from '@/lib/seed';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    
    try {
      await dbConnect();
      const filter: any = {};
      if (type && type !== 'All') filter.type = type;
      const cars = await Car.find(filter).sort({ createdAt: -1 });
      
      if (cars.length > 0) {
        return NextResponse.json(cars);
      }
      // If DB is connected but empty, fall back to mock
      console.log('DB empty, falling back to mock cars');
    } catch (dbError) {
      console.warn('Database connection failed, falling back to mock data:', dbError);
    }

    // Mock Fallback Logic
    let mockCars = (premiumCars || []).map((car, idx) => ({
      ...car,
      _id: `mock-${idx}`,
      isAvailable: true,
      createdAt: new Date().toISOString()
    }));

    if (type && type !== 'All') {
      mockCars = mockCars.filter(c => c.type === type);
    }

    // Ensure we return an array even if something went wrong
    return NextResponse.json(mockCars || []);
  } catch (error: any) {
    console.error('API Error (Cars GET):', error);
    // Ultimate fallback to avoid breaking UI
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const car = await Car.create(body);
    return NextResponse.json(car, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create car' }, { status: 500 });
  }
}
