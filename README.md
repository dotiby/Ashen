# Ashen

A single-page frontend for **Ashen (ASHN)** — the light that left the line.
The site runs entirely locally. It has no backend, database, wallet connection, or analytics.

## Stack

- React 19 + Vite 8 + TypeScript
- Lucide icons
- Keyboard/touch-controlled throne game in the middle section
- Instrument Sans, self-hosted from `/public/fonts`

## Requirements

- Node.js 20.19+ (or 22.12+)
- npm 10+

## Run locally

```bash
npm install
npm run dev
```

Then open the local URL printed by Vite (usually `http://localhost:5173/`).

On Windows, if PowerShell blocks `npm.ps1`, run the same commands through Command Prompt
or use `npm.cmd`:

```bat
npm.cmd install
npm.cmd run dev
```

Build and lint checks:

```bash
npm run build
npm run lint
```

Preview the production build locally:

```bash
npm run build
npm run preview
```

## Project structure

```text
ashen/
├─ public/
│  ├─ ashen-logo.jpg             Official token artwork, used unmodified
│  ├─ favicon-32.png             Favicon derived from the same artwork
│  ├─ favicon-64.png
│  ├─ apple-touch-icon.png
│  ├─ robots.txt
│  ├─ fonts/InstrumentSans-latin.woff2
│  ├─ giwa-symbol-black.svg      Official GIWA symbol for light surfaces
│  └─ giwa-symbol.webp           Official GIWA symbol for dark surfaces
├─ src/
│  ├─ components/
│  │  ├─ Footer.tsx
│  │  ├─ Header.tsx
│  │  ├─ Hero.tsx
│  │  ├─ Narrative.tsx
│  │  ├─ NetworkBadge.tsx
│  │  ├─ ThroneGame.tsx
│  │  ├─ TokenInfo.tsx
│  │  └─ TokenLogo.tsx           Single source for the token artwork
│  ├─ lib/procession.ts          Canvas lights + local session state
│  ├─ App.tsx
│  ├─ config.ts                  Token + network values
│  ├─ index.css
│  └─ main.tsx
└─ index.html
```

## Updating token values

Everything token-, network-, and launch-related lives in `src/config.ts`.

- `TOKEN.contractAddress` / `TOKEN.buyUrl` — already set to the live CA and Numen token
  link. The hero button is a real link and the copy button is enabled.
- `TOKEN.logo` — the exact token artwork used everywhere.
- `LAUNCH.logo` — empty by default. Drop the Numen Cash logo into `public/` and set its
  path here; a styled `N` mark is shown until then.
- `LAUNCH.*` — launchpad figures from the live listing (supply split, fees, migration
  threshold, quote asset, anti-snipe, max wallet).
- `NETWORK.*` — GIWA Sepolia chain values and official links.

## Implemented features

- Warm, light palette taken from the token artwork: parchment background, deep ink text,
  burnt-gold accents, oversized type, rounded cards, and generous spacing.
- The **exact token artwork** is the brand mark: header, hero identity, hero card,
  interactive stage, token seal, footer, and favicons. No redrawn or separate logo.
- Hero right column shows the token artwork with a prominent gold **Buy Now** link pointing
  to the live Numen token page.
- Procession Builder: tap/click the painting to place warm lights and embers on the
  original artwork, with a live "Lights placed" counter and Restart.
- Keyboard support: focus the canvas and press `Enter` or `Space`.
- Reduced-motion support in CSS and the canvas scene.
- Token panel with the full contract address, working copy button, explorer link, and
  live launch parameters displayed in a clean facts grid.
- Launchpad identity: **Numen Cash** / `@numencash` with links to the launchpad and X;
  official GIWA symbol used in light and dark variants.
- Accessible focus states, skip link, live counter, and descriptive links.
- Self-hosted font and artwork; no external image or font requests at runtime.
- Responsive layout from 320 px to desktop.

## Deploy folder

The deploy-ready folder is **`C:\Open Code\ashen`** — the `ashen` folder itself, not the
parent `C:\Open Code` folder. Upload this folder as the root of the GitHub repository.
`node_modules` and `dist` are ignored by `.gitignore`; Vercel will install and build from
`package.json`. `vercel.json` declares Vite with output directory `dist`.

Example Vercel settings (normally auto-detected):

- Framework: Vite
- Build command: `npm run build`
- Output directory: `dist`
- Install command: `npm install`

## Notes

- **Do not deploy** this project without explicit permission.
- Ashen is an unofficial experiment on **GIWA Sepolia** (chain ID `91342`).
  It is not affiliated with or endorsed by GIWA, Dunamu, Upbit, or Numen.
- Testnet assets have no real value. Nothing on the site is financial advice.
- The GIWA symbol is used unmodified from the official GIWA brand kit.
- Instrument Sans is licensed under the SIL Open Font License.
