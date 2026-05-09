**Context:** I have a Next.js 16.2.6 (App Router) project already initialized with Tailwind CSS and TypeScript. It is running. Do not generate any setup, config, or initialization files. Just output the source files I need to build this app.

**Next.js 16 requirement:** `params` is fully async. All dynamic route pages must type `params` as a `Promise` and await it before use. Example:

```ts
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  ...
}
```

Apply this pattern to ALL dynamic route pages: `/listings/[category]`, `/providers/[id]`, `/book/[id]`.

**Output each file as a clearly labeled code block with its full relative path. Output them in this order:**

1. `lib/data.ts`
2. Components: `components/Navbar.tsx`, `components/ProviderCard.tsx`, `components/CategoryCard.tsx`, `components/ActivityStrip.tsx`, `components/TestimonialCard.tsx`
3. Pages in route order: `app/page.tsx` → `app/categories/page.tsx` → `app/listings/[category]/page.tsx` → `app/providers/[id]/page.tsx` → `app/book/[id]/page.tsx` → `app/signup/page.tsx`

Complete each file fully before starting the next. Do not truncate or summarize any file.

---

**App:** "Service-U Cebu" — a local services marketplace demo for Cebu, Philippines.

**Stack already installed:** Next.js 16.2.6, App Router, Tailwind CSS, TypeScript. Use only these — no additional libraries.

**Data strategy:** All mock data lives in `lib/data.ts`. Pages are Server Components that import directly from it. Use `"use client"` only for `BookingForm` and `SignupForm` which handle local form state.

---

**ROUTES**

```
/                        → Landing Page
/categories              → Category Selection
/listings/[category]     → Listings filtered by category
/providers/[id]          → Provider Profile
/book/[id]               → Booking Form + Confirmation
/signup                  → Provider Signup + Confirmation
```

---

**`lib/data.ts`**

Export these TypeScript types and mock arrays:

```ts
Provider {
  id: string
  name: string
  service: string
  category: 'massage' | 'carpentry' | 'cleaning' | 'repairs'
  area: string
  rating: number
  reviewCount: number
  price: string
  bio: string
  verified: boolean
  availableToday: boolean
  lastBooked: string
  popular: boolean
}

Testimonial {
  name: string
  area: string
  text: string
}
```

Providers:

- Maria Reyes · Lahug · Massage · 4.9 · 38 reviews · ₱350–₱800
- Kuya Jun Santos · Talamban · Carpentry · 4.8 · 22 reviews · ₱500–₱1500
- Ate Nene Flores · Banilad · Cleaning · 5.0 · 15 reviews · ₱300–₱600
- Dong Villanueva · IT Park · Repairs · 4.7 · 41 reviews · ₱400–₱1200
- Manang Cita Abella · Mabolo · Massage · 4.9 · 29 reviews · ₱300–₱700
- Bong Ramos · Mandaue · Carpentry · 4.6 · 17 reviews · ₱600–₱1500
- Ate Belen Cruz · Lahug · Cleaning · 4.8 · 33 reviews · ₱350–₱650
- Noy Erwin Dacua · Talamban · Repairs · 4.9 · 52 reviews · ₱450–₱1000

Testimonials (3):

- "Naka-book ko og massage sa 5 minutes lang. Legit!" — Maria, Lahug
- "Nakit-an nako ang panday sa akong area dayon. Salamat!" — Kuya Jun, Talamban
- "Sulit kaayo. Balik-balik ko diri." — Ate Grace, Banilad

---

**PAGES & COMPONENTS**

**`app/page.tsx`** — Landing Page (Server Component)

- Navbar: logo "Service-U Cebu" left, "Apply as Provider" link right on desktop, hamburger on mobile
- Hero section:
  - Headline: "Pangita og serbisyo? Dali ra diri."
  - Subtext: "Massage, panday, limpyo balay, ug uban pa — sa Cebu."
  - Two CTAs: stacked on mobile, side-by-side on desktop:
    - "Book a Service" (primary, green) → `/categories`
    - "Apply as Provider" (secondary, outlined) → `/signup`
- `<ActivityStrip />` below hero:
  - 🟢 "3 katao nag-book karon"
  - ⭐ "100+ bookings this week"
- Testimonials: horizontally scrollable row on mobile, 3-column grid on desktop
- Footer: "© 2025 Service-U Cebu · Libre ang pag-apil"

**`app/categories/page.tsx`** — Category Selection (Server Component)

- 2×2 grid on mobile, 4-column on desktop
- Each `<CategoryCard />`: emoji, label, provider count derived from `lib/data.ts`
- Categories: 💆 Massage, 🔨 Panday, 🧹 Limpyo Balay, 🔧 Repairs
- Clicking a card → `/listings/[category]`

**`app/listings/[category]/page.tsx`** — Listings Page (Server Component)

- Await `params` before use (Next.js 16)
- Filter providers by `category` server-side
- Page title: "[Category] sa Cebu"
- Urgency banner: "⚡ Only 2 provider slots left in your area" (subtle yellow banner)
- Visual-only filter bar: "Nearest" / "Highest Rated" / "Available Now" (styled buttons, no logic)
- Grid of `<ProviderCard />` — 1 col mobile, 2 col desktop
- Each card:
  - Colored circle avatar with initials
  - Name, area, price, rating, review count
  - Green "✓ Verified" badge
  - Blue "Available Today" tag
  - Gray "Recently booked [X] ago" label
  - "Popular this week" label if `popular: true`
  - "Book Now" button → `/book/[id]`

**`app/providers/[id]/page.tsx`** — Provider Profile (Server Component)

- Await `params` before use (Next.js 16)
- Large initials avatar (80px circle)
- Name, service, area, rating, review count
- Badge row: "✓ Verified", "⚡ Responds in ~10 mins", "🏆 Top Provider"
- Bio from mock data
- 2 hardcoded sample reviews in Taglish
- Desktop: two-column layout (avatar + info left, bio + reviews right)
- Mobile: stacked, sticky "Book Now" bar fixed at bottom

**`app/book/[id]/page.tsx`** — Booking Page

- Await `params` before use (Next.js 16)
- Server Component shell that resolves provider name from `params.id`
- Renders `<BookingForm providerName={string} />` as a client component
- Form fields: Name, Phone, Date, Notes (optional)
- On submit: replace form with confirmation view:
  - CSS-only ✅ checkmark animation (scale + fade in)
  - "Request Sent!"
  - "Si [Provider Name] ma-contact nimo sulod sa pipila ka minuto."
  - "Providers usually respond within minutes." (gray subtext)
  - "Back to Home" button

**`app/signup/page.tsx`** — Provider Signup

- Server Component shell renders `<SignupForm />` as a client component
- Trust copy: "Libre sa sugod. Walay bayad sa pag-apil." + "Be one of the first providers in your area."
- Fields: Full Name, Service Type (dropdown with 4 options), Area/Location, Phone Number
- On submit: show confirmation:
  - "Salamat, [Name]!"
  - "We'll contact you within 24 hours."
  - "Back to Home" button

---

**DESIGN TOKENS (use as Tailwind arbitrary values or inline styles where needed)**

- Primary green: `#1DB954`
- Secondary blue: `#0077B6`
- Page background: `#F8F9FA`
- Cards: white, `rounded-2xl`, `shadow-sm`
- Buttons: `rounded-xl`, min height 48px, `font-semibold`
- Inputs: `rounded-xl border border-gray-200 p-3 w-full`
- Muted text: `text-gray-500`
- Max content width: `1100px`, centered

---

**RESPONSIVE RULES**

- Mobile `< 640px`: single column, full-width buttons, large tap targets (min 48px)
- Desktop `≥ 640px`: multi-column grids, max-width container centered
- Navbar: links visible on desktop, hamburger toggle (`useState`) on mobile

---

**PSYCHOLOGICAL ELEMENTS (subtle, not spammy)**

- "Popular this week" label on providers where `popular: true`
- "⚡ Only 2 provider slots left in your area" urgency on listings page
- Activity indicators on landing page
- Review counts and ratings on all provider cards
- "Libre ang pag-apil" on signup page

---

**CONSTRAINTS**

- No additional npm packages
- No API routes, no database, no auth
- No PWA manifest or service worker
- Server Components by default; `"use client"` only on `BookingForm` and `SignupForm`
- All data imported directly from `lib/data.ts`
- Lightweight — optimized for mid-range Android phones
