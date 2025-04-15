import React from 'react'
import styles from './Timer.module.css'

interface TimerProps {
    time: number;
}



const Timer = ({time}: TimerProps) => {
  const width = time / 15 * 100;
  const getColor = () => {
    if(time > 10) {
      return "green";
    } else if( time > 5) {
      return "yellow";
    } else {
      return "red"
    }
  }
    const style = {
      width: `${width}%`,
      background: getColor()
    }
    console.log("width", width)
  
  return (
    <div>
      {time}
      <div className={styles.parent}>
        <div className={styles.child} style={style}>
        </div>
    </div>
    </div>
    
  )
}

export default Timer