'use client';

import { useState, useEffect } from 'react';

type TimeUnit = 'Jours' | 'Heures' | 'Minutes' | 'Secondes';

const TimeBox = ({ value, unit }: { value: number; unit: TimeUnit }) => (
  <div className="flex flex-col items-center justify-center bg-card/50 backdrop-blur-sm rounded-lg p-3 md:p-4 w-20 md:w-24 border border-border">
    <span className="text-3xl md:text-4xl font-bold text-accent font-mono tracking-tighter">
      {String(value).padStart(2, '0')}
    </span>
    <span className="text-xs md:text-sm text-foreground/80">{unit}</span>
  </div>
);

const COUNTDOWN_KEY = 'ricstreaming-countdown-target';

export default function CountdownTimer() {
  const [targetDate, setTargetDate] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // This effect runs only on the client
    const storedTarget = localStorage.getItem(COUNTDOWN_KEY);

    if (storedTarget && new Date(storedTarget) > new Date()) {
      setTargetDate(storedTarget);
    } else {
      const newTarget = new Date();
      newTarget.setHours(newTarget.getHours() + 72);
      localStorage.setItem(COUNTDOWN_KEY, newTarget.toISOString());
      setTargetDate(newTarget.toISOString());
    }
  }, []);

  useEffect(() => {
    if (!targetDate) return;

    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      let newTimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

      if (difference > 0) {
        newTimeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      } else {
        // If countdown finishes, reset it for 72 hours from now
        const newTarget = new Date();
        newTarget.setHours(newTarget.getHours() + 72);
        localStorage.setItem(COUNTDOWN_KEY, newTarget.toISOString());
        setTargetDate(newTarget.toISOString());
      }
      return newTimeLeft;
    };

    // Set initial time left
    setTimeLeft(calculateTimeLeft());

    // Update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(timer);
  }, [targetDate]);
  
  if (!targetDate) {
    return (
        <div className="flex space-x-2 md:space-x-4 animate-pulse">
            <TimeBox value={0} unit="Jours" />
            <TimeBox value={0} unit="Heures" />
            <TimeBox value={0} unit="Minutes" />
            <TimeBox value={0} unit="Secondes" />
        </div>
    );
  }

  return (
    <div className="flex space-x-2 md:space-x-4">
      <TimeBox value={timeLeft.days} unit="Jours" />
      <TimeBox value={timeLeft.hours} unit="Heures" />
      <TimeBox value={timeLeft.minutes} unit="Minutes" />
      <TimeBox value={timeLeft.seconds} unit="Secondes" />
    </div>
  );
}
