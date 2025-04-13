'use client';

import { useReducer, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from './play.module.css';
import ReactConfetti from 'react-confetti';
import { ToastContainer, toast } from 'react-toastify';
import { gameReducer, initialGameState } from './state/game-reducer';
import { QuestionCard } from './components/QuestionCard/QuestionCard';
import { FeedbackPanel } from './components/Feedback/FeedbackPanel';
import { ScoreCard } from './components/ScoreCard/ScoreCard';
import { Navbar } from './components/Navbar/Navbar';
import { useUser } from '../contexts/UserContext';

interface ChallengeData {
    createdBy: string;
    challengerScore: number;
    challengerTotal: number;
}

export default function Play() {
    const [gameState, dispatch] = useReducer(gameReducer, initialGameState);
    const [showConfetti, setShowConfetti] = useState(false);
    const [challengeData, setChallengeData] = useState<ChallengeData | null>(null);
    const { user } = useUser();
    const searchParams = useSearchParams();
    const challengeId = searchParams.get('challengeBy');

    console.log("gameState", gameState);
    console.log("user", user);
    
    useEffect(() => {
        const loadChallenge = async () => {
            if (!challengeId) return;
            
            try {
                const response = await fetch(`/api/challenges/${challengeId}`);
                if (!response.ok) {
                    throw new Error('Failed to load challenge');
                }
                const data = await response.json();
                setChallengeData(data);
                toast.info(`${data.createdBy} challenged you! Their score: ${data.challengerScore}/${data.challengerTotal}`);
            } catch (error) {
                console.error('Failed to load challenge:', error);
                toast.error('Failed to load challenge details');
            }
        };

        loadChallenge();
    }, [challengeId]);

    useEffect(() => {
        if (user) {
            dispatch({
                type: 'SYNC_USER_SCORE',
                payload: {
                    totalCorrect: user.totalCorrect,
                    totalQuestions: user.totalQuestions
                }
            });
        }
    }, [user]);

    const fetchQuestion = async () => {
        dispatch({ type: 'START_LOADING' });
        try {
            const response = await fetch('/api/destinations/random');
            const data = await response.json();
            
            dispatch({ 
                type: 'LOAD_QUESTION_SUCCESS',
                payload: {
                    id: data.question.id,
                    clues: data.question.clues,
                    options: data.options
                }
            });
        } catch (error) {
            dispatch({ type: 'LOAD_QUESTION_ERROR' });
            toast.error('Failed to load question. Please try again.');
            console.error('Failed to fetch question:', error);
        }
    };

    const handleAnswer = async (city: string, country: string) => {
        if (gameState.selectedAnswer || !gameState.currentQuestion) return;

        const answer = { city, country };
        dispatch({ type: 'SELECT_ANSWER', payload: answer });
        
        try {
            const response = await fetch('/api/destinations/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    questionId: gameState.currentQuestion.id, 
                    answer 
                })
            });

            const result = await response.json();
            
            dispatch({
                type: 'VERIFY_ANSWER_SUCCESS',
                payload: {
                    correct: result.correct,
                    funFact: result.funFact || '',
                    trivia: result.trivia || '',
                    correctAnswer: result.correctAnswer || null
                }
            });

            if (user?.username) {
                try {
                    const response = await fetch('/api/users/score', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            username: user.username,
                            correct: result.correct,
                            total: 1
                        })
                    });
                    
                    if (response.ok) {
                        const updatedUser = await response.json();
                        if (updatedUser) {
                            dispatch({
                                type: 'SYNC_USER_SCORE',
                                payload: {
                                    totalCorrect: updatedUser.totalCorrect,
                                    totalQuestions: updatedUser.totalQuestions
                                }
                            });
                        }
                    }
                } catch (error) {
                    console.error('Failed to update user score:', error);
                    toast.error('Failed to save your score');
                }
            }

            if (result.correct) {
                setShowConfetti(true);
                setTimeout(() => setShowConfetti(false), 5000);
            }
        } catch (error) {
            toast.error('Failed to verify answer. Please try again.');
            console.error('Failed to verify answer:', error);
        }
    };

    const handleNextQuestion = () => {
        dispatch({ type: 'RESET_QUESTION' });
        setShowConfetti(false);
        fetchQuestion();
    };

    useEffect(() => {
        fetchQuestion();
    }, []);

    console.log("gameState my", gameState.loading);
    const isAnswered = Boolean(gameState.selectedAnswer);

    return (
        <div className={styles.pageContainer}>
            {showConfetti && <ReactConfetti numberOfPieces={400} />}
            
            <Navbar score={gameState.score} />
            
            {challengeData && (
                <div className={styles.challengeBanner}>
                    <div className={styles.score}>Target Score: {challengeData.challengerScore}</div>
                    <p className={styles.challengeText}>Challenged by {challengeData.createdBy}!</p>
                </div>
            )}
            
            <ScoreCard 
                correctAnswers={gameState.score.correct}
                incorrectAnswers={gameState.score.incorrect}
                totalScore={gameState.score.total}
            />
            
            <main className={styles.gameContainer}>
                    <QuestionCard
                        clues={gameState?.currentQuestion?.clues || []}
                        options={gameState?.currentQuestion?.options || []}
                        selectedAnswer={gameState?.selectedAnswer}
                        feedback={gameState?.feedback}
                        onAnswer={handleAnswer}
                        isAnswered={isAnswered}
                        isLoading={gameState?.loading}
                    />

                {gameState.feedback && (
                    <FeedbackPanel
                        feedback={gameState.feedback}
                        onNextQuestion={handleNextQuestion}
                    />
                )}
            </main>
            <ToastContainer />
        </div>
    );
}