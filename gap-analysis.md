# Service-U Cebu — Gap Analysis: Requirements vs. Implementation

## Structural Mismatches
| Issue | Requirement | Implemented |
|---|---|---|
| Architecture | Server Components default | All pages are `'use client'` |
| Extra deps | None beyond Next.js/Tailwind/TS | zustand, gsap, framer-motion, @radix-ui, clsx |
| PWA | No manifest/service worker | sw.js + manifest.json present |
| Route `/categories` | Plural | `/category` (singular) |
| Route `/providers/[id]` | Providers profile | `/profile/[providerId]` |
| Route `/book/[id]` | Booking | `/booking/[providerId]` |
| Next.js 16 params | `Promise<{id}>` + `await` | Uses `useParams()` (in client) |

## Missing Files (requirements specify dedicated components)
- **`components/Navbar.tsx`** — inline in page.tsx + TopNav/BottomNav (tab bar, not spec)
- **`components/ProviderCard.tsx`** — inline in ListingsPageClient, missing "Book Now" button, initials avatar
- **`components/CategoryCard.tsx`** — inline in category/page.tsx
- **`components/ActivityStrip.tsx`** — inline in page.tsx, wrong text
- **`components/TestimonialCard.tsx`** — testimonials entirely absent

## Landing Page Missing
- No testimonials section at all
- No footer ("© 2025 Service-U Cebu · Libre ang pag-apil")
- CTA says "Book Now" not "Book a Service"
- Activity text in English, not Cebuano

## Listings Page Missing
- Urgency banner "⚡ Only 2 provider slots left" — absent
- "Book Now" button on each card — absent (cards navigate to profile)
- Filter bar is functional — spec says visual-only styling
- Missing "Recently booked [X] ago" label

## Profile Page Missing
- Desktop two-column layout not implemented
- Missing "🏆 Top Provider" badge
- No 80px initials circle avatar (uses image)
- No 2 hardcoded Taglish reviews (uses data-driven)

## Booking Page Missing
- No "Date" field in form
- Confirmation text in English, not Cebuano ("Si [Name] ma-contact...")
- CSS-only checkmark — uses framer-motion instead

## Signup Page Missing
- No dedicated confirmation view (uses toast)
- No personalized "Salamat, [Name]!" greeting
- Bottom sheet picker instead of dropdown

## Data Mismatches
- 20 providers (different names/areas) vs spec's 8 specific providers
- `Provider` type missing `area`, `price`, `reviewCount`, `service`, `lastBooked`, `bio`
- `Provider` type has extra `image`, `responseTime`, `bookings`, `memberSince`
- No `Testimonial` type or data exists
- Category labels: "Carpentry"→should be "Panday", "Cleaning"→"Limpyo Balay", "Repairs"→"Ayuhon"

## Design Token Deviations
- Primary green: `#0F3D2E` vs required `#1DB954`
- No `#0077B6` blue used
- Background: `#F7F6F0` vs required `#F8F9FA`

---

**Bottom line**: The codebase is a completely different app. Almost every file needs to be rewritten or created from scratch. The plan covers all 12 files that need to be created/rewritten to match the spec.
