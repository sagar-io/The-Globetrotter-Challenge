import { GameState, GameAction } from './game.types';

export const initialGameState: GameState = {
    loading: true,
    error: null,
    currentQuestion: null,
    selectedAnswer: null,
    feedback: null,
    isVerifying: false,
    score: {
        correct: 0,
        incorrect: 0,
        total: 0
    }
};

export function gameReducer(state: GameState, action: GameAction): GameState {
    switch (action.type) {
        case 'START_LOADING':
            return {
                ...state,
                loading: true,
                error: null
            };

        case 'LOAD_QUESTION_ERROR':
            return {
                ...state,
                loading: false,
                error: 'Failed to load question'
            };

        case 'LOAD_QUESTION_SUCCESS':
            return {
                ...state,
                loading: false,
                error: null,
                currentQuestion: action.payload,
                selectedAnswer: null,
                feedback: null
            };

        case 'SELECT_ANSWER':
            return {
                ...state,
                selectedAnswer: action.payload,
                isVerifying: true
            };

        case 'VERIFY_ANSWER_SUCCESS':
            return {
                ...state,
                feedback: action.payload,
                isVerifying: false,
                score: {
                    ...state.score,
                    correct: action.payload.correct ? state.score.correct + 1 : state.score.correct,
                    incorrect: !action.payload.correct ? state.score.incorrect + 1 : state.score.incorrect,
                    total: state.score.total + 1
                }
            };

        case 'RESET_QUESTION':
            return {
                ...state,
                currentQuestion: null,
                selectedAnswer: null,
                feedback: null,
                isVerifying: false
            };

        case 'SYNC_USER_SCORE':
            return {
                ...state,
                score: {
                    correct: action.payload.totalCorrect,
                    total: action.payload.totalQuestions,
                    incorrect: action.payload.totalQuestions - action.payload.totalCorrect
                }
            };

        default:
            return state;
    }
} 