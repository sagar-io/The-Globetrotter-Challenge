import { Metadata } from 'next';
import clientPromise from '@/lib/mongodb';
import { DATABASE_NAME, COLLECTIONS } from '@/lib/constants';

export async function generateMetadata({ searchParams }: { searchParams: { challengeBy?: string } }): Promise<Metadata> {
    const challengeBy = searchParams?.challengeBy;
    
    if (!challengeBy) {
        return {
            title: 'Play GlobeTrotter',
            description: 'Test your geography knowledge with GlobeTrotter!'
        };
    }

    try {
        const client = await clientPromise;
        const db = client.db(DATABASE_NAME);
        const user = await db.collection(COLLECTIONS.USERS).findOne({ username: challengeBy });

        if (!user) {
            return {
                title: 'Play GlobeTrotter',
                description: 'Test your geography knowledge with GlobeTrotter!'
            };
        }

        const imageUrl = `/api/og?username=${encodeURIComponent(challengeBy)}&correct=${user.totalCorrect}&total=${user.totalQuestions}`;

        return {
            title: `${challengeBy}'s GlobeTrotter Challenge`,
            description: `${challengeBy} challenged you to beat their geography knowledge score! Can you do better?`,
            openGraph: {
                title: `${challengeBy}'s GlobeTrotter Challenge`,
                description: `${challengeBy} challenged you to beat their geography knowledge score! Can you do better?`,
                images: [{
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: `${challengeBy}'s GlobeTrotter Challenge`
                }]
            },
            twitter: {
                card: 'summary_large_image',
                title: `${challengeBy}'s GlobeTrotter Challenge`,
                description: `${challengeBy} challenged you to beat their geography knowledge score! Can you do better?`,
                images: [imageUrl]
            }
        };
    } catch (error) {
        console.error('Error generating metadata:', error);
        return {
            title: 'Play GlobeTrotter',
            description: 'Test your geography knowledge with GlobeTrotter!'
        };
    }
}

export default function PlayLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
} 