import { useState, useEffect } from 'react';

export interface DateCounter {
  totalDays: number;
  years: number;
  months: number;
  days: number;
  hours: number;
}

function calculate(start: Date): DateCounter {
  const now = new Date();
  const diff = now.getTime() - start.getTime();
  const totalDays = Math.floor(diff / 86_400_000);
  return {
    totalDays,
    years:  Math.floor(totalDays / 365.25),
    months: Math.floor((totalDays % 365.25) / 30.44),
    days:   Math.floor(totalDays % 30.44),
    hours:  now.getHours(),
  };
}

export function useDateCounter(startDate: Date): DateCounter {
  const [counter, setCounter] = useState(() => calculate(startDate));

  useEffect(() => {
    const timer = setInterval(() => setCounter(calculate(startDate)), 60_000);
    return () => clearInterval(timer);
  }, [startDate]);

  return counter;
}
