import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import dbConnect from '@/lib/dbConnect';
import Booking from '@/models/Booking';

export async function POST(request: Request) {
  try {
    const { carId, carName, pricePerDay, days, userId, pickupLocation, dropLocation, pickupDate, dropDate } = await request.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'inr',
            product_data: {
              name: carName,
              description: `Booking for ${days} days`,
            },
            unit_amount: pricePerDay * 100, // Stripe uses cents/paise
          },
          quantity: days,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXTAUTH_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXTAUTH_URL}/booking?carId=${carId}`,
      metadata: {
        carId,
        userId,
        pickupLocation,
        dropLocation,
        pickupDate,
        dropDate,
      },
    });

    return NextResponse.json({ id: session.id, url: session.url });
  } catch (error) {
    console.error('Stripe error:', error);
    return NextResponse.json({ error: 'Failed to create payment session' }, { status: 500 });
  }
}
