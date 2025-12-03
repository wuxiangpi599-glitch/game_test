export enum GameState {
  INTRO = 'INTRO',
  PLAYING = 'PLAYING',
  WON = 'WON'
}

export interface FloatingItem {
  id: number;
  x: number; // Percentage 0-100
  speed: number; // Duration in seconds
  type: ItemType;
  rotation: number;
}

export enum ItemType {
  CAKE = '🎂',
  GIFT = '🎁',
  HEART = '💖',
  LETTER = '💌',
  FLOWER = '🌹',
  CROWN = '👑'
}

export const TARGET_SCORE = 21;
export const BIRTHDAY_DATE = "2026年1月14日";