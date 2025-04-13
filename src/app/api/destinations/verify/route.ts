import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { DATABASE_NAME, COLLECTIONS } from '@/lib/constants';

export async function POST(request: Request) {
  try {
    const { questionId, answer } = await request.json();
    const client = await clientPromise;
    const db = client.db(DATABASE_NAME);
    
    const destination = await db.collection(COLLECTIONS.DESTINATIONS).findOne({
      _id: new ObjectId(questionId)
    });

    if (!destination) {
      return NextResponse.json(
        { error: 'Destination not found' },
        { status: 404 }
      );
    }

    const isCorrect = destination.city === answer.city && destination.country === answer.country;

    return NextResponse.json({
      correct: isCorrect,
      correctAnswer: { city: destination.city, country: destination.country },
      funFact: destination.fun_fact[Math.floor(Math.random() * destination.fun_fact.length)],
      trivia: isCorrect ? destination.trivia[Math.floor(Math.random() * destination.trivia.length)] : null
    });
  } catch (error) {
    console.error('Failed to verify answer:', error);
    return NextResponse.json(
      { error: 'Failed to verify answer' },
      { status: 500 }
    );
  }
}