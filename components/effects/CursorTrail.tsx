'use client';

import { useCursorTrail } from '@/hooks/useCursorTrail';

export default function CursorTrail({ active = true }: { active?: boolean }) {
  useCursorTrail(active);
  return null;
}
