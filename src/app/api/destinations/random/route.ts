import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { DATABASE_NAME, COLLECTIONS } from '@/lib/constants';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(DATABASE_NAME);
    
    const destinations = await db.collection(COLLECTIONS.DESTINATIONS)
      .aggregate([{ $sample: { size: 4 } }])
      .toArray();

    const questionDestination = destinations[0];
    
    return NextResponse.json({
      question: {
        clues: questionDestination.clues, 
        id: questionDestination._id        
      },
      options: destinations.map(dest => ({
        city: dest.city,
        country: dest.country
      })).sort(() => Math.random() - 0.5)
    });
  } catch (error) {
    console.error('Failed to fetch destinations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch destinations' }, 
      { status: 500 }
    );
  }
}