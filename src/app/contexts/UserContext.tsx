'use client';

import { createContext, useContext, useState, useEffect } from 'react';

interface User {
    createdAt: string;
    gamesPlayed: number;
    lastPlayed: string;
    totalCorrect: number;
    totalQuestions: number;
    username: string;
    _id: string;
}

interface UserContextType {
    user: User | null;
    setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const checkSession = async () => {
            try {
                const response = await fetch('/api/users/me');
                if (response.ok) {
                    const userData = await response.json();
                    setUser(userData);
                }
            } catch (error) {
                console.error('Failed to check session:', error);
            }
        };

        checkSession();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
} 