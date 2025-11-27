// ==========================================
// 1. TYPES & CONSTANTS
// ==========================================

export interface BlobConfig {
  id: number;
  x: number; 
  size: number; 
  duration: number; 
  delay: number; 
  opacity: number;
}

export type LampTheme = 'light' | 'dark' | 'auto';
export type LampColor = 'red' | 'blue' | 'green' | 'purple' | 'rainbow';

export interface LampConfig {
  theme: LampTheme;
  color: LampColor;
  size: number;
  speed: number;
  splashOpacity: number;
  isLocked: boolean;
  isOn: boolean;
  isMinimized: boolean;
  isSplashOn: boolean;
}

// 这里的颜色仅供初始化参考，实际渲染以 LavaLamp.tsx 内的 HOT_PALETTE 为准
export const COLOR_PALETTES: Record<LampColor, {
  liquidTop: string;
  liquidBottom: string;
  waxTop: string;
  waxBottom: string;
}> = {
  red: { liquidTop: '#fef3c7', liquidBottom: '#fbbf24', waxTop: '#f43f5e', waxBottom: '#be123c' },
  blue: { liquidTop: '#e0f2fe', liquidBottom: '#38bdf8', waxTop: '#3b82f6', waxBottom: '#1d4ed8' },
  green: { liquidTop: '#dcfce7', liquidBottom: '#4ade80', waxTop: '#10b981', waxBottom: '#047857' },
  purple: { liquidTop: '#f3e8ff', liquidBottom: '#c084fc', waxTop: '#a855f7', waxBottom: '#7e22ce' },
  rainbow: { liquidTop: '#fce7f3', liquidBottom: '#fbcfe8', waxTop: '#ec4899', waxBottom: '#be185d' }
};

export const METAL_THEMES: Record<string, {
  stop1: string;
  stop2: string;
  stop3: string;
  stroke: string;
}> = {
  light: { stop1: '#52525b', stop2: '#d4d4d8', stop3: '#a1a1aa', stroke: '#52525b' },
  dark: { stop1: '#1e293b', stop2: '#64748b', stop3: '#334155', stroke: '#0f172a' }
};

export type Language = 'en' | 'zh' | 'ja';

export const TRANSLATIONS = {
  zh: {
    title: 'ViViLAVA', 
    locked: '已锁定 (允许点击)', 
    unlocked: '未锁定 (允许拖动)',
    theme: '外观主题', 
    themeLight: '亮色', 
    themeDark: '枪灰', 
    themeAuto: '自动',
    color: '熔岩配色', 
    size: '尺寸大小', 
    speed: '流动速度', 
    opacity: '灯光通透度', // 顺便修正了这个翻译
    splash: '环境光效', 
    minimize: '最小化', 
    gift: 'ST 的一份礼物',
    copyright: '©Copyright PILIPLAN', 
    strike: '连击 3 次复活', 
    waiting: '冷却中...'
  },
  ja: {
    title: 'ViViLAVA', 
    locked: 'ロック中 (クリック可)', 
    unlocked: 'ロック解除 (ドラッグ可)',
    theme: 'テーマ', 
    themeLight: 'ライト', 
    themeDark: 'ガンメタル', 
    themeAuto: '自動',
    color: '配色', 
    size: 'サイズ', 
    speed: '速度', 
    opacity: '透明度',
    splash: '環境光', 
    minimize: '最小化', 
    gift: 'ST からの贈り物',
    copyright: '©Copyright PILIPLAN', 
    strike: '3回連打で復活', 
    waiting: '冷却中...'
  },
  en: {
    title: 'ViViLAVA', 
    locked: 'Locked (Clickable)', 
    unlocked: 'Unlocked (Draggable)',
    theme: 'Appearance', 
    themeLight: 'Light', 
    themeDark: 'Gunmetal', 
    themeAuto: 'Auto',
    color: 'Color', 
    size: 'Size', 
    speed: 'Speed', 
    opacity: 'Transparency', // 修正翻译
    splash: 'Ambient Light', 
    minimize: 'Minimize', 
    gift: 'A Gift from ST',
    copyright: '©Copyright PILIPLAN', 
    strike: 'STRIKE x 3', 
    waiting: 'WAITING...'
  }
};

// ==========================================
// 2. UTILS Helper
// ==========================================
export const getBrowserLanguage = (): Language => {
  if (typeof navigator === 'undefined') return 'en';
  let lang = '';
  if (navigator.languages && navigator.languages.length > 0) lang = navigator.languages[0];
  else if (navigator.language) lang = navigator.language;
  else { const nav = navigator as any; lang = nav.userLanguage || nav.browserLanguage || 'en'; }
  
  const lower = lang.toLowerCase();
  if (lower.startsWith('zh')) return 'zh';
  if (lower.startsWith('ja')) return 'ja';
  return 'en';
};