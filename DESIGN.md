# AETHEL ARCHITECTURE — DESIGN SYSTEM SPECIFICATION (DESIGN.md)

## 1. Haute Architectural Monograph Specification
- **Design Philosophy:** Crisp architectural precision, tactile materiality, museum-grade editorial spreads, and purposeful interaction.
- **Corner Radii Standard:** Subtle, millimetric radii (`rounded-lg` 8px, `rounded-md` 6px, `rounded-sm` 4px). Strict prohibition of generic bubbly `rounded-3xl` cards.
- **Editorial Typography:**
  - Cursive Flourish: `'Pinyon Script'`, cursive
  - Display & Headings: `'Cormorant Garamond'`, `'Marcellus'`, serif
  - Body & Subtitles: `'Plus Jakarta Sans'`, sans-serif
  - Coordinates & Details: `'Space Mono'`, monospace
- **Palette Core:** **Warm Sand (`#EEE7DB`)** canvas, **Deep Graphite (`#1B1D1C`)** typography, **Warm Limestone (`#E5DFD2`)**, **Alabaster (`#FAF7F2`)**, and **Warm Ochre (`#8C6D48`)**.

---

## 2. Color Tokens
```css
:root {
  --bg-primary: #eee7db;       /* Warm Sand Base Canvas */
  --bg-secondary: #e5dfd2;     /* Warm Limestone Surface */
  --bg-tertiary: #faf7f2;      /* Elevated Alabaster Stone Panel */
  --bg-elevated: #ffffff;      /* Pure Chalk Surface */
  --bg-graphite: #1b1d1c;      /* Deep Graphite Solid */
  --bg-translucent: rgba(238, 231, 219, 0.94);

  --border-subtle: rgba(27, 29, 28, 0.10);
  --border-medium: rgba(27, 29, 28, 0.20);
  --border-accent: rgba(27, 29, 28, 0.40);
  --border-graphite: #1b1d1c;

  --text-primary: #1b1d1c;
  --text-secondary: #4a4843;
  --text-muted: #7c776e;
  --text-accent: #8c6d48;
  --text-light: #eee7db;
}
```

---

## 3. Strict 4pt Grid & Precision Spacing
All dimensions, margins, padding, and gaps MUST adhere to the 4pt grid system:
`4px`, `8px`, `12px`, `16px`, `20px`, `24px`, `32px`, `40px`, `48px`, `64px`, `80px`, `96px`, `128px`.
