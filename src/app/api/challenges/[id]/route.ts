import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { DATABASE_NAME, COLLECTIONS } from '@/lib/constants';

type Params = Promise<{ id: string }>

export async function GET(
    _request: NextRequest,
    segmentData: { params: Params }
) {
    const params = await segmentData.params
    try {
        const client = await clientPromise;
        const db = client.db(DATABASE_NAME);
        
        const challenge = await db.collection(COLLECTIONS.CHALLENGES).findOne({ id: params.id });

        if (!challenge) {
            return NextResponse.json(
                { error: 'Challenge not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(challenge);
    } catch (error) {
        console.error('Challenge fetch error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch challenge' },
            { status: 500 }
        );
    }
}
