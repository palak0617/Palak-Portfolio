export interface Skill {
  name: string;
  color: 'brown' | 'blue' | 'green' | 'gold' | 'rose' | 'amber';
}

export interface Project {
  icon: string;
  title: string;
  description: string;
  tags: readonly string[];
  rotate: string;
}

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

export interface DiaryEntry {
  date: string;
  text: string;
}

export interface Chapter {
  id: string;
  label: string;
  bookmark: string;
}

export type Theme = 'light' | 'dark';

export interface SoundConfig {
  enabled: boolean;
  volume: number;
}
