'use client';

import cn from 'classnames';
import styles from './FeedbackPanel.module.css';

interface FeedbackPanelProps {
    feedback: {
        correct: boolean;
        funFact?: string;
        trivia?: string;
    };
    onNextQuestion: () => void;
}

export function FeedbackPanel({
    feedback,
    onNextQuestion
}: FeedbackPanelProps) {
    return (
        <div className={cn(styles.feedback, {
            [styles.feedbackCorrect]: feedback.correct,
            [styles.feedbackIncorrect]: !feedback.correct
        })}>
            <div className={styles.feedbackTitle}>
                {feedback.correct ? '🎉 Correct, well done—you\'ve got a sharp eye for clues!' : '😢 Incorrect, better luck next time!'}
            </div>

            {feedback.funFact && (
                <div className={styles.funFact}>
                    <strong className={styles.funFactTitle}>Fun Fact:</strong> {feedback.funFact}
                </div>
            )}
            
            <button 
                className={styles.nextButton}
                onClick={onNextQuestion}
            >
                Play Again
            </button>
        </div>
    );
} 