import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import clientPromise from '@/lib/mongodb';
import { DATABASE_NAME, COLLECTIONS } from '@/lib/constants';

export async function GET() {
    try {
        const cookieStore = await cookies();
        const username = cookieStore.get('username')?.value;
        
        if (!username) {
            return NextResponse.json(
                { error: 'Not authenticated' },
                { status: 401 }
            );
        }

        const client = await clientPromise;
        const db = client.db(DATABASE_NAME);
        
        const user = await db.collection(COLLECTIONS.USERS).findOne({ username });
        
        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(user);
    } catch (error) {
        console.error('Session check error:', error);
        return NextResponse.json(
            { error: 'Failed to check session' },
            { status: 500 }
        );
    }
} 