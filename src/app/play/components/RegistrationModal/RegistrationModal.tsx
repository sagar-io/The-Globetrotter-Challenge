'use client';

import { useState } from 'react';
import styles from './RegistrationModal.module.css';
import { useUser } from '@/app/contexts/UserContext';

interface RegistrationModalProps {
    onClose: () => void;
    onSuccess: (username: string) => void;
    currentScore: {
        correct: number;
        incorrect: number;
        total: number;
    };
}

export function RegistrationModal({ onClose, onSuccess, currentScore }: RegistrationModalProps) {
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { setUser } = useUser();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!username.trim()) {
            setError('Username is required');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            const response = await fetch('/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username.trim(),
                    initialScore: currentScore,
                }),
            });

            const data = await response.json();
            setUser(data);

            if (!response.ok) {
                if (response.status === 409) {
                    throw new Error('This username is already taken. Please choose another one.');
                }
                throw new Error(data.error || 'Registration failed');
            }

            onSuccess(username.trim());
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to register');
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={onClose}>×</button>
                
                <div className={styles.content}>
                    <h2>Register to Challenge Friends</h2>
                    <p>Choose a username to start saving your progress and challenge friends!</p>

                    <form onSubmit={handleSubmit}>
                        <div className={styles.inputGroup}>
                            <label htmlFor="username">Username</label>
                            <input
                                id="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter your username"
                                disabled={isLoading}
                            />
                            {error && <span className={styles.error}>{error}</span>}
                        </div>

                        <button 
                            type="submit" 
                            className={styles.submitButton}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Registering...' : 'Continue'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
} 