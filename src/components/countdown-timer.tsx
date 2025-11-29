'use client';

import { useState, useEffect } from 'react';

type CountdownTimerProps = {
  targetDate: string;
};

type TimeUnit = 'Jours' | 'Heures' | 'Minutes' | 'Secondes';

const TimeBox = ({ value, unit }: { value: number; unit: TimeUnit }) => (
  <div className="flex flex-col items-center justify-center bg-primary/20 backdrop-blur-sm rounded-lg p-3 md:p-4 w-20 md:w-24 border border-primary/50">
    <span className="text-3xl md:text-4xl font-bold text-primary font-mono tracking-tighter">
      {String(value).padStart(2, '0')}
    </span>
    <span className="text-xs md:text-sm text-accent">{unit}</span>
  </div>
);

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

      if (difference > 0) {
        timeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      return timeLeft;
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, isClient]);

  if (!isClient) {
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
