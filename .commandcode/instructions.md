# Design & Style Instructions for Service-U

## Tech Stack
- React 19 + TypeScript + Vite 7
- Tailwind CSS v3 with CSS custom properties (shadcn/ui New York style, slate base)
- shadcn/ui component library (components in `src/components/ui/`)
- framer-motion + GSAP for animations
- Zustand for state management (`src/store.ts`)
- Lucide React for icons
- Inter font family (weights: 400, 500, 600, 700)

## Color Palette

### Brand Colors
| Token | Hex | Usage |
|---|---|---|
| `--su-bg-primary` | `#F7F6F0` | Main page background (warm cream) |
| `--su-bg-secondary` | `#FFFFFF` | Card/surface backgrounds |
| `--su-bg-tertiary` | `#EDEADF` | Icon containers, subtle sections |
| `--su-bg-accent` | `#0F3D2E` | Dark green accent panels |
| `--su-brand-green` | `#0F3D2E` | Primary brand color (headers, nav, buttons) |
| `--su-brand-green-light` | `#1A5C45` | Lighter green variant |
| `--su-text-primary` | `#1A1A1A` | Primary body text |
| `--su-text-secondary` | `#5A5A5A` | Secondary/muted text |
| `--su-text-tertiary` | `#8A8A8A` | Tertiary/caption text |
| `--su-status-available` | `#2E8B57` | Positive/available status |
| `--su-status-urgent` | `#C45628` | Urgent/warning status |
| `--su-star-gold` | `#D4A843` | Star ratings, highlights |

### shadcn CSS Variables (in `:root`)
- `--primary: 158 74% 15%` (maps to brand green `#0F3D2E`)
- `--background: 45 20% 95%` (maps to `#F7F6F0`)
- `--foreground: 0 0% 10%` (maps to `#1A1A1A`)
- `--ring: 158 74% 15%` (focus rings in brand green)

### White-on-Dark Pattern
When placing text on dark green (`#0F3D2E`) or dark overlay backgrounds, use `color: '#FFFFFF'` with text shadows for readability: `textShadow: '0 2px 8px rgba(0,0,0,0.3)'`.

### Overlay Pattern
For foliage/image backgrounds, apply a fixed dark gradient overlay:
```
background: 'linear-gradient(180deg, rgba(15,61,46,0.55) 0%, rgba(15,61,46,0.35) 50%, rgba(15,61,46,0.55) 100%)'
```
Set `pointerEvents: 'none'` so touches pass through.

## Typography

- **Font family**: `'Inter', system-ui, -apple-system, sans-serif`
- **Font smoothing**: `antialiased` on macOS, `grayscale` on Firefox
- **Font weights used**: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)
- **Font size scale**:
  - `11px` — captions, fine print, badges
  - `13px` — small body, toast messages
  - `15px` — body text, subtext
  - `16-17px` — subheadings, button labels, category titles
  - `20px` — app title, section headers
  - `32px` — hero headlines
- **Letter spacing**: `-0.02em` for headlines, `0.03em` for captions/badges, `0.04em` for nav labels
- **Line height**: `1.1` for headlines, `1.2` for subheads, `1.5` for body

## Spacing & Layout

- Mobile-first design targeting ~375-428px width
- Pages are fixed full-viewport height with `overflow: hidden` on body
- Content scrolls inside a container with `overflowY: 'auto'`
- Bottom padding of `80px` on pages to accommodate BottomNav (64px)
- Section padding: `px-6` (24px horizontal) standard
- Card max-width on mobile: `320px`
- Gap between grid items: `12px` (gap-3)
- Safe area insets: use `env(safe-area-inset-bottom, 0px)`

## Styling Approach

**Use inline styles extensively.** This project prefers inline `style` props over Tailwind classes for colors, shadows, and layout values. Tailwind classes are used for structural/layout concerns (flex, grid, padding, etc.), but specific color values, custom shadows, and precise dimensions go in `style={{}}` objects.

```tsx
// DO — inline for specific values
<div style={{ background: '#F7F6F0', borderRadius: '12px', boxShadow: '0 4px 16px rgba(0,0,0,0.12)' }}>

// DO — Tailwind for structure
<div className="flex items-center justify-center px-6">
```

## Border Radius
- Cards/buttons: `12px` (standard), `16px` (large cards)
- Pills/chips: `20px` or `8px`
- Icon circles: `50%`
- shadcn `--radius`: `0.75rem`

## Shadows
Subtle and soft — never harsh.
- Cards: `0 4px 16px rgba(0,0,0,0.12)`
- Elevated modals: `0 8px 32px rgba(0,0,0,0.12)` or `0 8px 32px rgba(0,0,0,0.2)`
- Nav bar: `0 -4px 16px rgba(0,0,0,0.1)`
- Header bar: `0 1px 3px rgba(0,0,0,0.06)`

## Glass Morphism
For overlays on images:
```
background: 'rgba(255,255,255,0.2)'
backdropFilter: 'blur(8px)'
WebkitBackdropFilter: 'blur(8px)'
borderRadius: '20px'
```

## Navigation

- **BottomNav**: Fixed at bottom, `z-[100]`, 64px height, dark green (`#0F3D2E`) background
  - Active tab icons get `strokeWidth: 2.5` + `opacity: 1`, inactive get `strokeWidth: 1.5` + `opacity: 0.5`
  - Active indicator: 4px white dot
- **Header bars**: 56px height, dark green background, centered title

## Buttons

- Primary CTA: white background (`#FFFFFF`), brand green (`#0F3D2E`) text, 52px height, 16px font
- Secondary/outline: transparent bg, white border (`1.5px solid rgba(255,255,255,0.5)`), white text, 48px height
- Press state: `active:scale-[0.97]` with transition
- Category buttons: white card style with icon circle + name + Cebuano subtitle

## Animations

- **GSAP** for page entry animations (staggered reveals, y-translate + opacity)
  - `ease: 'power3.out'` is the default easing
  - Timelines with negative offsets for overlapping animations
  - Always wrap in `gsap.context()` with cleanup
- **framer-motion** for persistent UI (Toast, modals)
  - Spring transitions (`stiffness: 400, damping: 30`)
- **CSS keyframes** in `src/index.css`: `pulse-dot`, `spin-slow`, `checkmark-draw`

## Status Colors

- Available/positive: `#2E8B57` (green, `--su-status-available`)
- Urgent/warning: `#C45628` (rust orange, `--su-status-urgent`)
- Urgency banners: `background: 'rgba(196, 86, 40, 0.12)'` with `border: '1px solid rgba(196, 86, 40, 0.2)'`

## Icons

- Library: `lucide-react`
- Standard sizes: `12px` (inline badges), `14px` (small inline), `16px` (body), `20px` (nav), `24px` (category icons, back arrows)
- Icon containers: 56px circle with `#EDEADF` background for category icons, 32px for logos
- Icons on dark backgrounds use `color="#FFFFFF"`

## Component Patterns

- Pages live in `src/pages/` and are lazy-loaded in `App.tsx`
- Custom components in `src/components/` (not `ui/`)
- shadcn primitives in `src/components/ui/`
- Each page uses a ref + GSAP context for entry animations
- Pages set `setShowFoliage(true/false)` on mount
- Navigation goes through `useStore().navigate()` and `useStore().goBack()`

## File Structure
```
src/
  components/
    ui/          ← shadcn/ui primitives (button, card, dialog, etc.)
    BottomNav.tsx
    FoliageBackground.tsx
    Toast.tsx
  pages/        ← Route-level page components (lazy loaded)
  hooks/        ← Custom hooks
  lib/          ← Utility functions (cn, etc.)
  types/        ← TypeScript type definitions
  App.tsx       ← Root component with routing
  App.css       ← App-specific styles
  index.css     ← Global styles, CSS variables, font imports
  main.tsx      ← Entry point
  store.ts      ← Zustand store
  data.ts       ← Static data (categories, listings, etc.)
```
