import React from 'react'
import styles from './Timer.module.css';

const TimeUp = ({onClose}) => {
  return (
    <div className={styles.overlay} onClick={onClose}>
    <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        <p>Time Up !</p>
    </div>
    </div>
        
  )
}

export default TimeUp