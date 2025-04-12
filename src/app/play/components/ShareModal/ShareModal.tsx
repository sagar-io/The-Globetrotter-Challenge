'use client';

import styles from './ShareModal.module.css';
import Image from 'next/image';

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
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || `https://${window.location.host}`;
    const gameLink = `${baseUrl}/play?challengeBy=${encodeURIComponent(username)}`;
    const imageUrl = `${baseUrl}/api/og?username=${encodeURIComponent(username)}&correct=${score.correct}&total=${score.total}`;
    const message = `🎯 ${username} scored ${score.correct}/${score.total} in GlobeTrotter!\nCan you beat their score?\n\n👉 Play here: ${gameLink}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    console.log("imageUrl", imageUrl);
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
                    <a 
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.whatsappButton}
                    >
                        Share on WhatsApp
                    </a>
                </div>
            </div>
        </div>
    );
} 