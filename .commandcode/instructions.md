# Design & Style Instructions for Service-U (Next.js App Router)

## Tech Stack
- Next.js 16.2.6 (App Router)
- TypeScript + Tailwind CSS
- No additional npm packages (no GSAP, no framer-motion, no zustand, no shadcn)
- Server Components by default — `"use client"` only for `BookingForm` and `SignupForm`

## Design Tokens

| Token | Value | Usage |
|---|---|---|
| Primary green | `#1DB954` | Primary buttons, CTAs |
| Secondary blue | `#0077B6` | Accent elements |
| Page background | `#F8F9FA` | Main page background |
| Cards | White, `rounded-2xl`, `shadow-sm` | All card surfaces |
| Buttons | `rounded-xl`, min 48px height, `font-semibold` | All buttons |
| Inputs | `rounded-xl border border-gray-200 p-3 w-full` | Form inputs |
| Muted text | `text-gray-500` | Secondary/supporting text |
| Max content width | `1100px`, centered | Container width |

## Color Palette

- Primary: `#1DB954` (green)
- Secondary: `#0077B6` (blue)
- Background: `#F8F9FA` (light gray)
- Cards: white with `shadow-sm`
- Text primary: `text-gray-900` (Tailwind default)
- Text muted: `text-gray-500`
- Urgency banner: subtle yellow background

## Typography

- Font: default system/Tailwind font stack
- No custom font imports required
- Standard Tailwind text sizes

## Responsive Rules

- **Mobile** `< 640px`: single column, full-width buttons, large tap targets (min 48px)
- **Desktop** `≥ 640px`: multi-column grids, max-width container centered
- **Navbar**: links visible on desktop, hamburger toggle (`useState`) on mobile

## Navigation

- Top navbar: logo "Service-U Cebu" left, "Apply as Provider" link right on desktop
- Hamburger menu on mobile (< 640px)
- `useState` for mobile toggle in Navbar component

## Buttons

- Primary: green (`#1DB954`), `rounded-xl`, min 48px height, `font-semibold`
- Secondary/outlined: border style, `rounded-xl`, min 48px height, `font-semibold`
- Large tap targets on mobile (min 48px)

## Forms

- Inputs: `rounded-xl border border-gray-200 p-3 w-full`
- Dropdown matching input style
- Labels above fields

## Psychological Elements

- "Popular this week" label on providers marked `popular: true`
- Urgency banner on listings: "⚡ Only 2 provider slots left in your area"
- Activity indicators on landing page (green dot + star)
- Review counts and ratings on all provider cards
- "Libre ang pag-apil" trust copy on signup

## Architecture Rules

- **Server Components by default** — all pages except booking form and signup form
- **`"use client"` boundaries** only on:
  - `BookingForm` (form state: Name, Phone, Date, Notes)
  - `SignupForm` (form state: Full Name, Service Type, Area, Phone)
  - `Navbar` (hamburger toggle state for mobile)
- **All data from `lib/data.ts`** — imported directly into Server Components
- **No API routes, no database, no auth**
- **No PWA manifest or service worker**
- **Lightweight** — optimized for mid-range Android phones

## File Structure
```
lib/
  data.ts              ← Mock data (providers, testimonials, types)
components/
  Navbar.tsx            ← Client: logo + "Apply as Provider" + hamburger
  ProviderCard.tsx      ← Server: provider display card
  CategoryCard.tsx      ← Server: category selection card
  ActivityStrip.tsx     ← Server: live activity indicators
  TestimonialCard.tsx   ← Server: testimonial display
app/
  page.tsx              ← Server: landing page (/)
  categories/
    page.tsx            ← Server: category selection (/categories)
  listings/
    [category]/
      page.tsx          ← Server: filtered listings (/listings/[category])
  providers/
    [id]/
      page.tsx          ← Server: provider profile (/providers/[id])
  book/
    [id]/
      page.tsx          ← Server shell + BookingForm client (/book/[id])
  signup/
    page.tsx            ← Server shell + SignupForm client (/signup)
```
