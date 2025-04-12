import Image from 'next/image';
import styles from './ShareCard.module.css';

interface ShareCardProps {
    username: string;
    score: {
        correct: number;
        total: number;
    };
}

export function ShareCard({ username, score }: ShareCardProps) {
    const percentage = Math.round((score.correct / score.total) * 100);
    
    return (
        <div className={styles.shareCard} id="share-card">
            <div className={styles.header}>
                <Image
                    src="/images/globe.svg"
                    alt="GlobeTrotter Logo"
                    width={60}
                    height={60}
                    priority
                />
                <h2 className={styles.title}>GlobeTrotter Challenge</h2>
            </div>

            <div className={styles.scoreSection}>
                <div className={styles.scoreCircle}>
                    <span className={styles.percentage}>{percentage}%</span>
                    <span className={styles.score}>{score.correct}/{score.total}</span>
                </div>
            </div>

            <div className={styles.challengeText}>
                <p className={styles.username}>{username}</p>
                <p className={styles.message}>challenged you to beat their score!</p>
            </div>

            <div className={styles.footer}>
                <p>🌍 Test your geography knowledge</p>
                <p className={styles.playText}>Play Now!</p>
            </div>
        </div>
    );
} 