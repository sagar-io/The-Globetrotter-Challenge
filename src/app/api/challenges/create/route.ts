import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { nanoid } from 'nanoid';
import clientPromise from '@/lib/mongodb';
import { DATABASE_NAME, COLLECTIONS } from '@/lib/constants';
import { headers } from 'next/headers';

export async function POST(request: Request) {
    try {
        const cookieStore = await cookies();
        const username = cookieStore.get('username')?.value;
        
        if (!username) {
            return NextResponse.json(
                { error: 'User not authenticated' },
                { status: 401 }
            );
        }

        const { score } = await request.json();

        if (typeof score?.correct !== 'number' || typeof score?.total !== 'number') {
            return NextResponse.json(
                { error: 'Invalid score data' },
                { status: 400 }
            );
        }

        const client = await clientPromise;
        const db = client.db(DATABASE_NAME);

        const challengeId = nanoid();
        const challenge = {
            id: challengeId,
            createdBy: username,
            createdAt: new Date(),
            status: 'active',
            challengerScore: score.correct,
            challengerTotal: score.total,
            participants: []
        };

        await db.collection(COLLECTIONS.CHALLENGES).insertOne(challenge);

        const headersList = await headers();
        const host = headersList.get('host') || '';
        const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
        const baseUrl = process.env.NEXT_PUBLIC_APP_URL || `${protocol}://${host}`;

        return NextResponse.json({
            ...challenge,
            shareUrl: `${baseUrl}/play?challengeBy=${challengeId}`
        });
    } catch (error) {
        console.error('Challenge creation error:', error);
        return NextResponse.json(
            { error: 'Failed to create challenge' },
            { status: 500 }
        );
    }
} 