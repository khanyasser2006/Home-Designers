# 🏛️ Aethel Architecture

A cinematic, editorial-magazine-style site for a luxury residential architecture studio — a 201-frame scroll-scrubbed aerial hero, a curated residence and materials catalog with dynamic detail pages, a procedurally generated ambient soundscape, and a genuinely extensive admin CMS covering nearly every piece of content on the site.

![React](https://img.shields.io/badge/-React%2018-61DAFB?style=flat-square&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/-Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/-Tailwind%20CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![GSAP](https://img.shields.io/badge/-GSAP-88CE02?style=flat-square&logo=greensock&logoColor=white)
![Lenis](https://img.shields.io/badge/-Lenis-000000?style=flat-square)

---

## 🧰 Technologies

- React 18
- Vite 6
- JavaScript
- Tailwind CSS v3
- GSAP (ScrollTrigger)
- Lenis (smooth scrolling)
- Web Audio API (procedural ambient sound)
- Hand-rolled History API router
- Browser `localStorage` (accounts, CMS content)

---

## ✨ Features

- **201-Frame Scroll Hero**: An aerial flythrough scrubbed frame-by-frame against scroll position, batch-loaded and rendered on a decoupled canvas loop synced with GSAP ScrollTrigger.
- **Procedural Ambient Soundscape**: A toggleable ambient hum synthesized live with the Web Audio API — layered oscillators and filtered noise, not a pre-recorded audio file — with its filter tone shifting as you scroll.
- **Lenis Smooth Scrolling**: Inertia-based smooth scroll on every page, correctly paused and resumed whenever a modal or drawer opens.
- **Dynamic Residence & Material Pages**: A curated portfolio of residences and a materials library, each opening into its own detail page via a hand-rolled client-side router.
- **Extensive Admin CMS**: A password-gated dashboard covering residences, materials, philosophy copy, essays, standards, benchmarks, hero chapters, press acclaim, studio locations, and commission settings — nearly every piece of copy on the site is editable.
- **Salted, Hashed Authentication**: Passwords are hashed client-side with the Web Crypto API (SHA-256, per-user salt) rather than stored in plain text, with automatic migration of any legacy unhashed accounts.
- **Login Rate Limiting**: Failed sign-in attempts trigger an escalating lockout with a live countdown.
- **Live Studio Clocks**: The Contact page shows a running local clock for each studio location.
- **Commission Inquiry Drawer**: A global, persistent inquiry form reachable from nearly every page, with an anti-bot honeypot field.
- **Custom Cursor & Scroll-Reveal System**: A bespoke cursor treatment and a shared `useScrollReveal` hook used consistently across sections instead of one-off animation code per component.
- **Editorial Design System**: A warm sand-and-graphite palette, a four-font type system including a cursive flourish face, and a strict 4pt spacing grid documented in a written design spec.

---

## 🪜 The Process

I started with the hero, again: an aerial flythrough exported as a 201-frame sequence, scrubbed against scroll position on a canvas and synced through GSAP's ScrollTrigger, with Lenis layered underneath for the smooth, weighted scroll feel that makes frame-scrubbing read as cinematic instead of choppy.

With the movement language established, I built out the content model as a real CMS rather than a handful of hardcoded arrays: residences, materials, philosophy copy, standards, press acclaim, and studio locations all live in one typed default dataset, each with its own create/update/delete functions, so the admin dashboard could eventually edit almost anything on the site without touching code.

Authentication went through more than one pass. The first version compared plain passwords directly; the current version hashes every password client-side with the Web Crypto API using a per-user salt, adds a failed-attempt lockout, and migrates any older unhashed accounts the moment they log in again.

The detail I'm happiest with is the ambient soundscape: instead of looping an audio file, it synthesizes a soft, evolving hum live in the browser with layered oscillators and filtered noise, and shifts its own tone as you scroll — a small thing most visitors might not consciously notice, but it makes the site feel considered rather than decorated.

The last stretch was wiring the Commission Drawer and Contact form into every page that needed a conversion point, including an anti-bot honeypot field on both — though I'll be honest that the actual submission handling on both forms is still a placeholder; they confirm on screen but don't yet send anywhere.

---

## 📚 What I Learned

- **Synthesizing Audio in the Browser**: Built a layered-oscillator-plus-filtered-noise ambient soundscape directly with the Web Audio API, including a Voss-McCartney-style algorithm for natural-sounding colored noise.
- **Coordinating Two Scroll Systems**: Ran Lenis (for the overall smooth-scroll feel) and GSAP ScrollTrigger (for frame-accurate hero scrubbing) together without them fighting each other, including exposing Lenis on `window` so other code could pause it during modals.
- **Modeling Content Before Building the CMS**: Designed one large, typed default-data object covering every editable entity first, so the admin dashboard's CRUD functions could all follow the same shape instead of being bespoke per section.
- **Iterating on Auth Instead of Rewriting It**: Moved from plain-text password comparison to salted SHA-256 hashing with a legacy-migration path, rather than a one-time rewrite, so existing accounts didn't need to be reset.
- **Hand-Rolling Just Enough Router**: Built a small History-API-based router and `Link` component instead of adding a routing library, since the app only needed path matching and `pushState`, not the rest of a full router's feature set.
- **Locking Scroll Correctly**: Learned that locking scroll for a modal means also pausing Lenis, not just setting `overflow: hidden` — otherwise the smooth-scroll engine keeps intercepting wheel events underneath the modal.

---

## 🔧 How Can It Be Improved?

- The Commission Drawer and Contact page forms both call `preventDefault()` and show a success state, but neither actually sends the submitted data anywhere yet — worth connecting to a real email API or backend before this goes live, since inquiries are the site's core purpose.
- Both the patron and admin login checks happen entirely in the browser (`user.isAdmin` in React state, backed by `localStorage`) — a real deployment needs a server that issues and verifies sessions, since the current setup can be bypassed from the browser console regardless of how well the password hashing itself is done.
- Move the CMS-edited content (residences, materials, philosophy copy, and the rest) from `localStorage` into a real database, so an admin's edits are visible to actual site visitors rather than just the browser that made them.
- Self-host the residence and material photography instead of hotlinking it from Unsplash, for reliability and load-time control independent of a third party.
- Rename `public/cabinet_frames_600fps` — it's a leftover name from an earlier, kitchen-focused version of this hero technique; the folder now holds 201 architectural flythrough frames, not 600 cabinet frames.
- Add a progressive loading strategy for the hero frames (a sparse set first, the rest streamed in afterward) instead of loading all 201 in sequential batches before the sequence is fully scrubbable.

---

## 🚀 Running the Project

### Step 1 — Clone the Repository

```bash
git clone https://github.com/<your-username>/aethel-architecture.git
cd aethel-architecture
```

---

### Step 2 — Install Dependencies

**Prerequisites:** Node.js 18+

```bash
npm install
```

---

### Step 3 — Run the Development Server

```bash
npm run dev
```

---

### Step 4 — Open the Application

Open the address shown in your terminal (usually):

```
http://localhost:5173
```

---

## 🎥 Video

*Add a screen recording of the hero flythrough here — and don't forget to toggle the ambient soundscape on, since that's a detail a silent recording won't capture either.*

---
