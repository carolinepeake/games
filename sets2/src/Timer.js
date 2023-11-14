import React, { useState, useEffect } from 'react';

type TimerProps = {
  gameStatus: 'idle' | 'started' | 'paused' | 'resumed' | 'ended';
};

export const Timer = ({ gameStatus }: TimerProps) => {

  const [elapsedSecs, setElapsedSecs] = useState(0);

  useEffect(() => {
    let interval;
    if (gameStatus === 'started' || gameStatus === 'resumed') {
      interval = setInterval(() => {
          setElapsedSecs(prevSecs => prevSecs + 1);
      }, 1000);
    } else if (gameStatus === 'idle') {
      setElapsedSecs(0)
    }
    return () => clearInterval(interval);
  }, [gameStatus]);

  let timerText = Math.floor(elapsedSecs / 60) + ':' + ('0' + (elapsedSecs % 60)).slice(-2);
  if (elapsedSecs >= 3600) {
    timerText = Math.floor(elapsedSecs / 3600) + ':' + timerText;
  };

  return (
    <div className="timer">{timerText}</div>
  );
};