import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Merge Tailwind classes safely */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Random float between min and max */
export function rand(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

/** Random integer between min and max (inclusive) */
export function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/** Clamp a value between min and max */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** Map a value from one range to another */
export function mapRange(value: number, inMin: number, inMax: number, outMin: number, outMax: number): number {
  return ((value - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin;
}

/** Stagger delay in seconds */
export function staggerDelay(index: number, base = 0.08): number {
  return index * base;
}

/** Check if we're in a browser */
export const isBrowser = typeof window !== 'undefined';

/** Easing curves */
export const EASING = {
  easeInOut:   [0.4, 0, 0.2, 1]   as [number,number,number,number],
  easeOut:     [0, 0, 0.2, 1]     as [number,number,number,number],
  easeIn:      [0.4, 0, 1, 1]     as [number,number,number,number],
  bounce:      [0.34, 1.56, 0.64, 1] as [number,number,number,number],
  pageTurn:    [0.4, 0, 0.2, 1]   as [number,number,number,number],
  gentle:      [0.25, 0.46, 0.45, 0.94] as [number,number,number,number],
} as const;
