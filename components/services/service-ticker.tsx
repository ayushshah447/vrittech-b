"use client";

import { useEffect, useState } from "react";

/** Figma: each "animate" instance changes to its next variant after 3s. */
const TICK_MS = 3000;

/*
 * Geometry of the Figma "animate" component, in em of the 52px heading so it
 * scales with the font. The words are stacked 62.4px tall with a 26px gap, and
 * each variant is a clipping window aligned to one of them:
 *   UI & UX     – top aligned,    53px tall
 *   Development – centre aligned, 53px tall
 *   Blockchain  – bottom aligned, 66px tall
 */
const PX = 1 / 52;
const STACK_HEIGHT = (3 * 62.4 + 2 * 26) * PX;
const SLOTS = [
  { height: 53 * PX, offset: 0 },
  { height: 53 * PX, offset: (53 * PX - STACK_HEIGHT) / 2 },
  { height: 66 * PX, offset: 66 * PX - STACK_HEIGHT },
] as const;

type ServiceTickerProps = {
  words: readonly [string, string, string];
};

/**
 * Three windows onto the same word list. Every 3s each window moves to the next
 * variant (UI & UX → Development → Blockchain → UI & UX), smart-animated with a
 * 300ms ease-out, so the last step slides back down to the first word.
 */
export function ServiceTicker({ words }: ServiceTickerProps) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setTick((value) => value + 1), TICK_MS);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="font-grotesk text-[36px] font-bold tracking-[-0.01em] text-ink md:text-[44px] xl:text-[52px]">
      <ul className="sr-only">
        {words.map((word) => (
          <li key={word}>{word}</li>
        ))}
      </ul>
      <div aria-hidden="true" className="flex flex-col" style={{ gap: `${35 * PX}em` }}>
        {words.map((_, row) => {
          const slot = SLOTS[(row + tick) % SLOTS.length];
          return (
            <div
              key={row}
              className="overflow-hidden transition-[height] duration-300 ease-out"
              style={{ height: `${slot.height}em` }}
            >
              <div
                className="flex flex-col leading-[1.2] transition-transform duration-300 ease-out"
                style={{ gap: `${26 * PX}em`, transform: `translateY(${slot.offset}em)` }}
              >
                {words.map((word) => (
                  <span key={word} className="whitespace-nowrap">
                    {word}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
