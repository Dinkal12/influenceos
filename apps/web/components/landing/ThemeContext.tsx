'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type ThemeId = 'dark' | 'minimal' | 'moody' | 'emerald'

export interface Theme {
  id: ThemeId
  name: string
  label: string
  preview: string // css gradient for the swatch
  vars: Record<string, string>
}

export const THEMES: Theme[] = [
  {
    id: 'dark',
    name: 'Obsidian',
    label: 'Dark',
    preview: 'linear-gradient(135deg, #000 0%, #1a1a1a 100%)',
    vars: {
      '--bg': '#000000',
      '--bg-2': '#0a0a0a',
      '--bg-card': 'rgba(255,255,255,0.02)',
      '--bg-card-hover': 'rgba(255,255,255,0.05)',
      '--border': 'rgba(255,255,255,0.08)',
      '--border-hover': 'rgba(255,255,255,0.15)',
      '--fg': '#ffffff',
      '--fg-muted': 'rgba(255,255,255,0.4)',
      '--fg-subtle': 'rgba(255,255,255,0.2)',
      '--accent': '#ff6b00',
      '--accent-fg': '#ffffff',
      '--accent-2': 'rgba(255,107,0,0.12)',
      '--accent-glow': 'rgba(255,107,0,0.18)',
      '--badge-bg': 'rgba(255,107,0,0.08)',
      '--badge-border': 'rgba(255,107,0,0.25)',
      '--hero-bg': 'radial-gradient(ellipse 80% 60% at 50% 40%, #111 0%, #000 100%)',
      '--hero-particle': '255,255,255',
      '--nav-scroll': 'rgba(0,0,0,0.7)',
      '--section-divider': 'rgba(255,255,255,0.05)',
      '--code-bg': 'rgba(0,0,0,0.6)',
      '--scrollbar': '#333',
      '--selection-bg': 'rgba(255,107,0,0.15)',
      '--cta-primary': '#ff6b00',
      '--cta-primary-fg': '#ffffff',
      '--cta-secondary-border': 'rgba(255,255,255,0.12)',
      '--cta-secondary-fg': 'rgba(255,255,255,0.7)',
      '--label-dot': '#ff6b00',
      '--icon-bg': 'rgba(255,107,0,0.1)',
      '--glow': 'rgba(255,107,0,0.06)',
      '--input-bg': 'rgba(255,255,255,0.04)',
      '--grid-color': 'rgba(255,255,255,0.04)',
      '--hero-headline': '#ffffff',
      '--hero-highlight': '#ff6b00',
      '--form-card-bg': '#111111',
      '--form-card-border': 'rgba(255,255,255,0.08)',
    },
  },
  {
    id: 'minimal',
    name: 'Clean White',
    label: 'Light',
    preview: 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)',
    vars: {
      '--bg': '#f4f4f5',
      '--bg-2': '#ffffff',
      '--bg-card': 'rgba(0,0,0,0.03)',
      '--bg-card-hover': 'rgba(0,0,0,0.06)',
      '--border': 'rgba(0,0,0,0.1)',
      '--border-hover': 'rgba(0,0,0,0.25)',
      '--fg': '#0a0a0a',
      '--fg-muted': 'rgba(0,0,0,0.5)',
      '--fg-subtle': 'rgba(0,0,0,0.3)',
      '--accent': '#e85d00',
      '--accent-fg': '#ffffff',
      '--accent-2': 'rgba(232,93,0,0.1)',
      '--accent-glow': 'rgba(232,93,0,0.15)',
      '--badge-bg': 'rgba(232,93,0,0.08)',
      '--badge-border': 'rgba(232,93,0,0.25)',
      '--hero-bg': 'linear-gradient(180deg, #ede9e3 0%, #f4f4f5 60%)',
      '--hero-particle': '0,0,0',
      '--nav-scroll': 'rgba(255,255,255,0.9)',
      '--section-divider': 'rgba(0,0,0,0.06)',
      '--code-bg': 'rgba(0,0,0,0.04)',
      '--scrollbar': '#ccc',
      '--selection-bg': 'rgba(232,93,0,0.12)',
      '--cta-primary': '#e85d00',
      '--cta-primary-fg': '#ffffff',
      '--cta-secondary-border': 'rgba(0,0,0,0.15)',
      '--cta-secondary-fg': 'rgba(0,0,0,0.6)',
      '--label-dot': '#e85d00',
      '--icon-bg': 'rgba(232,93,0,0.08)',
      '--glow': 'rgba(232,93,0,0.04)',
      '--input-bg': 'rgba(0,0,0,0.04)',
      '--grid-color': 'rgba(0,0,0,0.06)',
      '--hero-headline': '#0a0a0a',
      '--hero-highlight': '#e85d00',
      '--form-card-bg': '#ffffff',
      '--form-card-border': 'rgba(0,0,0,0.1)',
    },
  },
  {
    id: 'moody',
    name: 'Dark Amber',
    label: 'Amber',
    preview: 'linear-gradient(135deg, #1a1612 0%, #2d2821 100%)',
    vars: {
      '--bg': '#13110d',
      '--bg-2': '#1a1612',
      '--bg-card': 'rgba(255,210,150,0.03)',
      '--bg-card-hover': 'rgba(255,210,150,0.06)',
      '--border': 'rgba(200,170,120,0.1)',
      '--border-hover': 'rgba(200,170,120,0.3)',
      '--fg': '#f0e8d8',
      '--fg-muted': 'rgba(220,200,160,0.5)',
      '--fg-subtle': 'rgba(220,200,160,0.28)',
      '--accent': '#f59e0b',
      '--accent-fg': '#13110d',
      '--accent-2': 'rgba(245,158,11,0.1)',
      '--accent-glow': 'rgba(245,158,11,0.18)',
      '--badge-bg': 'rgba(245,158,11,0.08)',
      '--badge-border': 'rgba(245,158,11,0.25)',
      '--hero-bg': 'radial-gradient(ellipse 80% 60% at 50% 40%, #2a231a 0%, #13110d 100%)',
      '--hero-particle': '245,158,11',
      '--nav-scroll': 'rgba(19,17,13,0.85)',
      '--section-divider': 'rgba(245,158,11,0.08)',
      '--code-bg': 'rgba(0,0,0,0.4)',
      '--scrollbar': '#3d3328',
      '--selection-bg': 'rgba(245,158,11,0.15)',
      '--cta-primary': '#f59e0b',
      '--cta-primary-fg': '#13110d',
      '--cta-secondary-border': 'rgba(245,158,11,0.2)',
      '--cta-secondary-fg': 'rgba(220,200,160,0.7)',
      '--label-dot': '#f59e0b',
      '--icon-bg': 'rgba(245,158,11,0.09)',
      '--glow': 'rgba(245,158,11,0.05)',
      '--input-bg': 'rgba(255,255,255,0.03)',
      '--grid-color': 'rgba(200,170,120,0.05)',
      '--hero-headline': '#f0e8d8',
      '--hero-highlight': '#f59e0b',
      '--form-card-bg': '#1c1914',
      '--form-card-border': 'rgba(200,170,120,0.12)',
    },
  },
  {
    id: 'emerald',
    name: 'Emerald',
    label: 'Emerald',
    preview: 'linear-gradient(135deg, #0d2818 0%, #1a4a2e 100%)',
    vars: {
      '--bg': '#0a1f14',
      '--bg-2': '#0f2a1c',
      '--bg-card': 'rgba(52,211,153,0.03)',
      '--bg-card-hover': 'rgba(52,211,153,0.06)',
      '--border': 'rgba(52,211,153,0.1)',
      '--border-hover': 'rgba(52,211,153,0.3)',
      '--fg': '#e8f5ee',
      '--fg-muted': 'rgba(180,230,200,0.5)',
      '--fg-subtle': 'rgba(180,230,200,0.28)',
      '--accent': '#34d399',
      '--accent-fg': '#0a1f14',
      '--accent-2': 'rgba(52,211,153,0.1)',
      '--accent-glow': 'rgba(52,211,153,0.18)',
      '--badge-bg': 'rgba(52,211,153,0.08)',
      '--badge-border': 'rgba(52,211,153,0.25)',
      '--hero-bg': 'radial-gradient(ellipse 80% 60% at 50% 40%, #0f3322 0%, #0a1f14 100%)',
      '--hero-particle': '52,211,153',
      '--nav-scroll': 'rgba(10,31,20,0.85)',
      '--section-divider': 'rgba(52,211,153,0.07)',
      '--code-bg': 'rgba(0,0,0,0.4)',
      '--scrollbar': '#1a4a2e',
      '--selection-bg': 'rgba(52,211,153,0.15)',
      '--cta-primary': '#34d399',
      '--cta-primary-fg': '#0a1f14',
      '--cta-secondary-border': 'rgba(52,211,153,0.2)',
      '--cta-secondary-fg': 'rgba(180,230,200,0.7)',
      '--label-dot': '#34d399',
      '--icon-bg': 'rgba(52,211,153,0.08)',
      '--glow': 'rgba(52,211,153,0.05)',
      '--input-bg': 'rgba(52,211,153,0.04)',
      '--grid-color': 'rgba(52,211,153,0.05)',
      '--hero-headline': '#e8f5ee',
      '--hero-highlight': '#34d399',
      '--form-card-bg': '#0c2318',
      '--form-card-border': 'rgba(52,211,153,0.12)',
    },
  },
]

interface ThemeCtx {
  theme: Theme
  setTheme: (id: ThemeId) => void
}

const ThemeContext = createContext<ThemeCtx>({
  theme: THEMES[0],
  setTheme: () => {},
})

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeId, setThemeId] = useState<ThemeId>('dark')

  const theme = THEMES.find((t) => t.id === themeId) ?? THEMES[0]

  useEffect(() => {
    const saved = localStorage.getItem('influenceos-theme') as ThemeId | null
    if (saved && THEMES.find((t) => t.id === saved)) setThemeId(saved)
  }, [])

  useEffect(() => {
    const root = document.documentElement
    Object.entries(theme.vars).forEach(([key, val]) => root.style.setProperty(key, val))
    localStorage.setItem('influenceos-theme', themeId)
  }, [theme, themeId])

  return (
    <ThemeContext.Provider value={{ theme, setTheme: setThemeId }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
