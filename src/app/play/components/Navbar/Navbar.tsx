'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './Navbar.module.css';
import { useUser } from '@/app/contexts/UserContext';
import { useState } from 'react';
import { ShareModal } from '../ShareModal/ShareModal';
import { RegistrationModal } from '../RegistrationModal/RegistrationModal';

interface NavbarProps {
    score: {
        correct: number;
        incorrect: number;
        total: number;
    };
}

export function Navbar({ score }: NavbarProps) {
    const { user } = useUser();
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);

    const handleChallengeClick = () => {
        if (!user) {
            setIsRegistrationModalOpen(true);
        } else {
            setIsShareModalOpen(true);
        }
    };

    const handleRegistrationSuccess = () => {
        setIsRegistrationModalOpen(false);
        setIsShareModalOpen(true);
    };

    return (
        <>
        <nav className={styles.navbar}>
            <div className={styles.leftSection} />
            <div className={styles.centerSection}>
                <Link href="/" className={styles.logoLink}>
                    <Image
                        className={styles.logoImage}
                        src="/images/globe.svg"
                        alt="GlobeTrotter Logo"
                        width={50}
                        height={50}
                        priority
                    />
                    <div className={styles.logoText}>GlobeTrotter</div>
                </Link>
            </div>
            <div className={styles.rightSection}>
                <button 
                    className={styles.challengeButton}
                    onClick={handleChallengeClick}
                >
                    Challenge a Friend
                </button>
            </div>
        </nav>
        {isRegistrationModalOpen && (
            <RegistrationModal
                onClose={() => setIsRegistrationModalOpen(false)}
                onSuccess={handleRegistrationSuccess}
                currentScore={score}
            />
        )}

        {isShareModalOpen && user && (
            <ShareModal
                onClose={() => setIsShareModalOpen(false)}
                username={user.username}
                score={{
                    correct: score.correct,
                    total: score.total,
                    incorrect: score.incorrect
                }}
            />
        )}
        </>
    );
} 