import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>The<br /> Globetrotter <br /> Challenge</h1>
        <Link href='/play'>
          <button className={styles.button}>
            START GAME
          </button>
        </Link>
      </main>
    </div>
  );
}
