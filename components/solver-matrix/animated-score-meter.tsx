"use client";

import { useEffect, useState } from "react";

type AnimatedScoreMeterProps = {
  active: boolean;
  value: string;
};

function parsePercent(value: string) {
  const parsed = Number.parseInt(value.replace("%", ""), 10);

  return Number.isFinite(parsed) ? parsed : 0;
}

export function AnimatedScoreMeter({ active, value }: AnimatedScoreMeterProps) {
  const target = parsePercent(value);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!active) {
      setDisplayValue(0);
      return;
    }

    let step = 0;
    const totalSteps = 18;
    const interval = window.setInterval(() => {
      step += 1;
      setDisplayValue(Math.round((target * step) / totalSteps));

      if (step >= totalSteps) {
        window.clearInterval(interval);
      }
    }, 28);

    return () => window.clearInterval(interval);
  }, [active, target]);

  return (
    <span className="inline-flex items-baseline gap-1">
      <span>{displayValue}</span>
      <span className="text-sm">%</span>
    </span>
  );
}
