'use client';

import { Copy, CopyCheck, ImageDown } from 'lucide-react';
import styles from './ShareModal.module.css';
import Image from 'next/image';
import { useState, useEffect } from 'react';

interface ShareModalProps {
    onClose: () => void;
    username: string;
    score: {
        correct: number;
        total: number;
        incorrect: number;
    };
}

export function ShareModal({ onClose, username, score }: ShareModalProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [challengeId, setChallengeId] = useState<string | null>(null);
    const [isCopied, setIsCopied] = useState(false);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://the-globetrotter-game.vercel.app';
    
    useEffect(() => {
        const createChallenge = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('/api/challenges/create', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ score })
                });
                
                if (!response.ok) {
                    throw new Error('Failed to create challenge');
                }
                
                const data = await response.json();
                setChallengeId(data.id);
            } catch (error) {
                console.error('Failed to create challenge:', error);
            } finally {
                setIsLoading(false);
            }
        };
        
        createChallenge();
    }, [score]);

    const gameLink = challengeId 
        ? `${baseUrl}/play?challengeBy=${challengeId}`
        : `${baseUrl}/play`;
    const imageUrl = `${baseUrl}/api/og?username=${encodeURIComponent(username)}&correct=${score.correct}&total=${score.total}`;
    const message = `🎯 ${username} scored ${score.correct}/${score.total} in GlobeTrotter!\nCan you beat their score?\n\n👉 Play here: ${gameLink}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;

    const handleDownload = async () => {
        try {
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `globetrotter-challenge-${username}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Failed to download image:', error);
        }
    };

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(gameLink);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch (error) {
            console.error('Failed to copy link:', error);
        }
    };
    
    console.log("Debug Share Modal:");
    console.log("Base URL:", baseUrl);
    console.log("Image URL:", imageUrl);
    console.log("Environment:", process.env.NODE_ENV);
    
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <button className={styles.closeButton} onClick={onClose}>×</button>
                <h2>Challenge your friends!</h2>
                
                <div className={styles.preview}>
                    <Image 
                        src={imageUrl} 
                        alt="Challenge Preview"
                        className={styles.previewImage}
                        width={1200}
                        height={630}
                        priority
                    />
                </div>

                <div className={styles.actions}>
                    {isLoading ? (
                        <div className={styles.loading}>Creating your challenge...</div>
                    ) : (
                        <>
                            <a 
                                href={whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.whatsappButton}
                            >
                                Share on WhatsApp
                            </a>
                            <button 
                                onClick={handleDownload}
                                className={styles.downloadButton}
                            >
                                <ImageDown />
                            </button>
                            <button 
                                onClick={handleCopyLink}
                                className={`${styles.copyButton} ${isCopied ? styles.copied : ''}`}
                            >
                                {isCopied ? <CopyCheck /> : <Copy />}
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
} 