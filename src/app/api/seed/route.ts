import { NextResponse } from 'next/server';
import { seedCars } from '@/lib/seed';

export async function GET() {
  try {
    await seedCars();
    return NextResponse.json({ message: 'Database seeded successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Seeding failed' }, { status: 500 });
  }
}
