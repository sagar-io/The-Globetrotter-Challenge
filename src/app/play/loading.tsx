import Image from 'next/image';
import styles from './loading.module.css';

export default function Loading() {
    return (
        <div className={styles.container}>
            <div className={styles.loadingContent}>
                <Image
                    src="/images/map.svg"
                    alt="Loading GlobeTrotter..."
                    width={120}
                    height={120}
                    className={styles.loadingImage}
                    priority
                />
                <h2 className={styles.loadingText}>Loading GlobeTrotter...</h2>
            </div>
        </div>
    );
} 