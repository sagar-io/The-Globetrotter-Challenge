import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { DATABASE_NAME, COLLECTIONS } from '@/lib/constants';

export async function POST(request: Request) {
    try {
        const { username } = await request.json();

        if (!username?.trim()) {
            return NextResponse.json(
                { error: 'Username is required' },
                { status: 400 }
            );
        }

        const client = await clientPromise;
        const db = client.db(DATABASE_NAME);

        const existingUser = await db.collection(COLLECTIONS.USERS).findOne({ username });
        if (existingUser) {
            return NextResponse.json(
                { error: 'Username already taken' },
                { status: 409 }
            );
        }

        const user = {
            username,
            createdAt: new Date(),
            totalCorrect: 0,
            totalQuestions: 0,
            gamesPlayed: 0,
            lastPlayed: new Date()
        };

        await db.collection(COLLECTIONS.USERS).insertOne(user);

        const response = NextResponse.json(user);
        response.cookies.set('username', username, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60
        });

        return response;
    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json(
            { error: 'Failed to register user' },
            { status: 500 }
        );
    }
} 