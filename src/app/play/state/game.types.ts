export interface Location {
    city: string;
    country: string;
}

export interface Question {
    id: string;
    clues: string[];
    options: Location[];
}

export interface GameState {
    loading: boolean;
    error: string | null;
    currentQuestion: {
        id: string;
        clues: string[];
        options: Array<{ city: string; country: string }>;
    } | null;
    selectedAnswer: { city: string; country: string } | null;
    feedback: {
        correct: boolean;
        funFact?: string;
        trivia?: string;
        correctAnswer: { city: string; country: string } | null;
    } | null;
    isVerifying: boolean;
    score: {
        correct: number;
        incorrect: number;
        total: number;
    };
    consecutiveCorrectQues: number
}

export type GameAction =
    | { type: 'START_LOADING' }
    | { type: 'LOAD_QUESTION_ERROR' }
    | { type: 'LOAD_QUESTION_SUCCESS'; payload: GameState['currentQuestion'] }
    | { type: 'SELECT_ANSWER'; payload: { city: string; country: string } }
    | { type: 'VERIFY_ANSWER_SUCCESS'; payload: {consecutiveCorrectQues: number; correct: boolean; funFact?: string; trivia?: string; correctAnswer: { city: string; country: string } | null } }
    | { type: 'RESET_QUESTION' }
    | { type: 'SYNC_USER_SCORE'; payload: { totalCorrect: number; totalQuestions: number } }; 