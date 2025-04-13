'use client';

import cn from 'classnames';
import styles from './QuestionCard.module.css';

interface QuestionCardProps {
    clues: string[];
    options: Array<{ city: string; country: string }>;
    selectedAnswer: { city: string; country: string } | null;
    feedback: { correct: boolean; correctAnswer: { city: string; country: string } | null } | null;
    onAnswer: (city: string, country: string) => void;
    isAnswered: boolean;
    isLoading: boolean;
}

export function QuestionCard({ 
    clues, 
    options, 
    selectedAnswer, 
    feedback, 
    onAnswer, 
    isAnswered,
    isLoading
}: QuestionCardProps) {
    if (isLoading) {
        return (
            <div className={styles.questionCard}>
                <div className={styles.skeletonTitle} />
                <div>
                    <div className={styles.skeletonClue} />
                    <div className={styles.skeletonClue} />
                </div>
                <div className={styles.optionsGrid}>
                    <div className={styles.skeletonOption} />
                    <div className={styles.skeletonOption} />
                    <div className={styles.skeletonOption} />
                    <div className={styles.skeletonOption} />
                </div>
            </div>
        );
    }

    return (
        <div className={styles.questionCard}>
            <div className={styles.questionText}>
                <h2>Can You Guess This City?</h2>
            </div>

            <div className={styles.clue}>
                {clues.map((clue, id) => (
                    <h3 key={id}>{clue}</h3>
                ))}
            </div>

            <div className={styles.optionsGrid}>
                {options.map((option, id) => {
                    const isSelected = option.city === selectedAnswer?.city && 
                                     option.country === selectedAnswer?.country;
                    const isCorrect = feedback?.correct;
                    const isIncorrect = !isCorrect && isSelected;
                    const isCorrectAnswer = option.city === feedback?.correctAnswer?.city &&
                                          option.country === feedback?.correctAnswer?.country;

                    return (
                        <button
                            key={id}
                            className={cn(styles.optionButton, {
                                [styles.incorrectAnswer]: isIncorrect,
                                [styles.correctAnswer]: isCorrectAnswer
                            })}
                            onClick={() => onAnswer(option.city, option.country)}
                            disabled={isAnswered}
                        >
                            📍 {option.city}, {option.country}
                        </button>
                    );
                })}
            </div>
        </div>
    );
} 