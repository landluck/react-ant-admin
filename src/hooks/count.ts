import { useState, useRef } from 'react';

function useCount(defaultValue: number): [number, () => void, () => void] {
  const timer = useRef<NodeJS.Timer | null>(null);

  const [count, setCount] = useState(defaultValue);

  const closeTimer = () => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  };

  const beiginTimer = () => {
    setCount(value => {
      if (value === 0) {
        closeTimer();
        return defaultValue;
      }

      timer.current = setTimeout(() => {
        beiginTimer();
      }, 1000);

      return value - 1;
    });
  };

  return [count, beiginTimer, closeTimer];
}

export default useCount;
