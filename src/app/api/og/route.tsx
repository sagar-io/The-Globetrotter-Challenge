import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const username = searchParams.get('username') || 'Anonymous';
        const correct = parseInt(searchParams.get('correct') || '0');
        const total = parseInt(searchParams.get('total') || '0');

        return new ImageResponse(
            (
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'linear-gradient(135deg, #4589cd 0%, #2c5282 100%)',
                        padding: '40px 60px',
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '40px' }}>
                        <img
                            src={`${process.env.NEXT_PUBLIC_BASE_URL}/images/globe.svg`}
                            width="80"
                            height="80"
                            alt="GlobeTrotter Logo"
                        />
                        <h1 style={{ 
                            fontSize: '48px',
                            color: 'white',
                            margin: 0,
                            fontFamily: 'Fredoka'
                        }}>
                            GlobeTrotter Challenge
                        </h1>
                    </div>

                    <div style={{
                        width: '200px',
                        height: '200px',
                        borderRadius: '50%',
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: '4px solid rgba(255, 255, 255, 0.3)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '40px'
                    }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <span style={{ 
                                fontSize: '72px',
                                fontWeight: 'bold',
                                color: 'white',
                                lineHeight: 1
                            }}>
                                {correct}
                            </span>
                            <span style={{
                                fontSize: '28px',
                                color: 'rgba(255, 255, 255, 0.9)',
                                marginTop: '8px'
                            }}>
                                Score
                            </span>
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '40px' }}>
                        <p style={{
                            fontSize: '36px',
                            color: '#FFD700',
                            fontWeight: 'bold',
                            margin: 0
                        }}>
                            {username}
                        </p>
                        <p style={{
                            fontSize: '32px',
                            color: 'white',
                            opacity: 0.9,
                            margin: '10px 0 0'
                        }}>
                            challenged you to beat their score!
                        </p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <p style={{
                            fontSize: '28px',
                            color: 'white',
                            margin: 0
                        }}>
                            🌍 Test your geography knowledge
                        </p>
                        <p style={{
                            fontSize: '36px',
                            color: '#FFD700',
                            fontWeight: 'bold',
                            margin: '10px 0 0'
                        }}>
                            Play Now!
                        </p>
                    </div>
                </div>
            ),
            {
                width: 1200,
                height: 630
            }
        );
    } catch (error) {
        console.error('Error generating OG image:', error);
        return new Response('Error generating image', { status: 500 });
    }
} 