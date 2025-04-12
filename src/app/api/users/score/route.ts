import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { DATABASE_NAME, COLLECTIONS } from '@/lib/constants';

export async function POST(request: Request) {
  try {
    const { username, correct } = await request.json();

    if (!username) {
      return NextResponse.json(
        { error: 'Username is required' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db(DATABASE_NAME);

    await db.collection(COLLECTIONS.USERS).updateOne(
      { username },
      {
        $set: {
          lastPlayed: new Date()
        },
        $inc: {
          totalCorrect: correct ? 1 : 0,
          totalQuestions: 1
        }
      }
    );

    const updatedUser = await db.collection(COLLECTIONS.USERS).findOne(
      { username },
      { projection: { totalCorrect: 1, totalQuestions: 1 } }
    );

    return NextResponse.json({
      success: true,
      totalCorrect: updatedUser?.totalCorrect || 0,
      totalQuestions: updatedUser?.totalQuestions || 0
    });
  } catch (error) {
    console.error('Failed to update score:', error);
    return NextResponse.json(
      { error: 'Failed to update score' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username');

    if (!username) {
      return NextResponse.json(
        { error: 'Username is required' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db(DATABASE_NAME);

    const user = await db.collection(COLLECTIONS.USERS).findOne(
      { username },
      { projection: { totalCorrect: 1, totalQuestions: 1, lastPlayed: 1, username: 1 } }
    );

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      username: user.username,
      totalCorrect: user.totalCorrect || 0,
      totalQuestions: user.totalQuestions || 0,
      lastPlayed: user.lastPlayed
    });
  } catch (error) {
    console.error('Failed to fetch user score:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user score' },
      { status: 500 }
    );
  }
}