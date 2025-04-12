'use client';

import styles from './ScoreCard.module.css';

interface ScoreCardProps {
    correctAnswers: number;
    incorrectAnswers: number;
    totalScore: number;
}

export function ScoreCard({ correctAnswers, incorrectAnswers, totalScore }: ScoreCardProps) {
    const totalAnswers = correctAnswers + incorrectAnswers;
    const successRate = totalAnswers > 0 ? (correctAnswers / totalAnswers) * 100 : 0;
    
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (successRate / 100) * circumference;

    return (
        <div className={styles.scoreCard}>
            <div className={styles.scoreBoxes}>
                <div className={styles.incorrectBox}>
                    <div className={styles.scoreNumber}>{incorrectAnswers}</div>
                    <div className={styles.scoreLabel}>Incorrect</div>
                </div>
                
                <div className={styles.totalBox}>
                    <div className={styles.totalScore}>{correctAnswers}/{totalScore}</div>
                    <div className={styles.totalLabel}>Total Score</div>
                </div>
                
                <div className={styles.correctBox}>
                    <div className={styles.scoreNumber}>{correctAnswers}</div>
                    <div className={styles.scoreLabel}>Correct</div>
                </div>

                <div className={styles.successBox}>
                    <div className={styles.circleProgress}>
                        <svg width="120" height="120" viewBox="0 0 120 120">
                            <circle
                                className={styles.circleBackground}
                                cx="60"
                                cy="60"
                                r={radius}
                                fill="none"
                                strokeWidth="8"
                            />
                            <circle
                                className={styles.circleIndicator}
                                cx="60"
                                cy="60"
                                r={radius}
                                fill="none"
                                strokeWidth="8"
                                strokeDasharray={circumference}
                                strokeDashoffset={offset}
                                transform="rotate(-90 60 60)"
                            />
                            <text
                                x="60"
                                y="60"
                                className={styles.circleText}
                                dominantBaseline="middle"
                                textAnchor="middle"
                            >
                                {Math.round(successRate)}%
                            </text>
                        </svg>
                        <div className={styles.scoreLabel}>Success Rate</div>
                    </div>
                </div>
            </div>
        </div>
    );
} 