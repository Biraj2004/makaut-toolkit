<div align="center">

<img src="src/app/icon.png" alt="MAKAUT Toolkit Logo" width="96" height="96" />

<h1>MAKAUT Toolkit</h1>

<p><strong>An all-in-one academic utility suite for MAKAUT students — grade calculators, live notices, and scholarship tools in one place.</strong></p>

<p>
  Calculate SGPA / YGPA / CGPA / DGPA &nbsp;|&nbsp; Track live university notices &nbsp;|&nbsp; Estimate scholarship marks
</p>

<!-- Badges Row 1: Meta -->
<p>
  <img src="https://img.shields.io/github/issues/Biraj2004/makaut-toolkit?label=Issues&color=ef4444" alt="Open Issues" />
  <img src="https://img.shields.io/badge/Platform-Web-3b82f6?logo=googlechrome&logoColor=white" alt="Platform" />
  <img src="https://img.shields.io/badge/License-MIT-16a34a" alt="MIT License" />
  <img src="https://img.shields.io/badge/PRs-Welcome-22c55e" alt="PRs Welcome" />
</p>

<!-- Badges Row 2: Stack -->
<p>
  <img src="https://img.shields.io/badge/Next.js-16.1.1-000000?logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19.2.3-20232a?logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-Strict-3178c6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind%20CSS-v4-06b6d4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Node.js-20%2B-339933?logo=nodedotjs&logoColor=white" alt="Node 20+" />
</p>
<!-- Action Buttons -->

<p>
  <a href="https://makaut-toolkit.vercel.app">
    <img src="https://img.shields.io/badge/🌐%20LIVE-Demo-16a34a?style=for-the-badge" alt="Live Demo" />
  </a>
  &nbsp;
  <a href="https://github.com/Biraj2004/makaut-toolkit/issues/new">
    <img src="https://img.shields.io/badge/🐛%20REPORT-Issue-ef4444?style=for-the-badge" alt="Report Issue" />
  </a>
  &nbsp;
  <a href="CONTRIBUTING.md">
    <img src="https://img.shields.io/badge/🤝%20READ-Contributing-4f46e5?style=for-the-badge" alt="Contributing" />
  </a>
</p>

</div>

---

**MAKAUT Toolkit** is a clean, performance-focused web application built for students of Maulana Abul Kalam Azad University of Technology (MAKAUT). It consolidates all academic calculation needs into a single, fast interface — SGPA/YGPA/CGPA/DGPA conversions, scholarship-grade yearly marks estimation, and live official notice tracking.

---

## 🌐 Live Demo

> **[makaut-toolkit.vercel.app](https://makaut-toolkit.vercel.app)**

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Architecture](#-architecture)
- [Business Logic — Formulas](#-business-logic--formulas)
- [Getting Started](#-getting-started)
- [Available Scripts](#-available-scripts)
- [Contributing](#-contributing)
- [Security](#-security)
- [License](#-license)

---

## ✨ Features

### 🎓 Grade Calculators

A full suite of client-side calculators, all powered by MAKAUT-specific formulas with live validation and precise 3-decimal results.

| Calculator | What it does |
|---|---|
| **SGPA → Percentage** | Converts a semester SGPA to percentage using the official MAKAUT formula |
| **YGPA → Percentage** | Converts odd + even semester SGPA pair to annual percentage; supports both standard and credit-weighted averaging |
| **Yearly Marks** | Estimates total and obtained marks across a full year — designed for scholarship renewal forms (SVMCM, OASIS, Aikashree) |
| **DGPA** | Computes Degree GPA across 4 degree pathway types: 4-Year B.Tech, Lateral Entry, 3-Year, and 2-Year |
| **CGPA** | Credit-weighted cumulative GPA across 2–10 semesters |

> ⚠️ **Note on Yearly Marks:** The yearly marks percentage is an approximate estimate based on subject count, not an exact credit-weighted official value. This caveat is shown directly in the UI.

### 📢 Live University Updates

- Fetches official notices from the MAKAUT API (`makaut1.ucanapply.com`) server-side on every request.
- Top 3 notices are automatically tagged with a **NEW** badge (position-based, not date-based).
- View More / View Less controls with smooth scroll-to-top on collapse.
- Empty state fallback with a direct link to the official MAKAUT portal.

### 🎨 Modern UI/UX

- **Dark mode first** — tokens defined in `globals.css`, applied via `<html class="dark">`.
- **Fully responsive** — persistent sidebar on desktop, Radix Sheet drawer on mobile.
- **Accessible** — semantic HTML, `sr-only` labels on sheet navigation, ARIA-compatible Radix primitives.
- **No external data dependencies at runtime** for calculators — all logic is client-side.

---

## 🛠 Tech Stack

<div align="center">

| Layer | Technology |
|---|---|
| **Framework** | ![Next.js](https://img.shields.io/badge/Next.js%2016%20App%20Router-000000?logo=nextdotjs&logoColor=white) |
| **UI Library** | ![React](https://img.shields.io/badge/React%2019-20232a?logo=react&logoColor=61DAFB) |
| **Language** | ![TypeScript](https://img.shields.io/badge/TypeScript%20(strict)-3178c6?logo=typescript&logoColor=white) |
| **Styling** | ![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS%20v4-06b6d4?logo=tailwindcss&logoColor=white) ![tw-animate-css](https://img.shields.io/badge/tw--animate--css-1e293b) |
| **Components** | ![Radix UI](https://img.shields.io/badge/Radix%20UI-1a1a1a?logo=radixui&logoColor=white) ![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-000000) |
| **Icons** | ![Lucide](https://img.shields.io/badge/lucide--react-f97316) |
| **Analytics** | ![Vercel Analytics](https://img.shields.io/badge/Vercel%20Analytics-000000?logo=vercel&logoColor=white) |
| **Linting** | ![ESLint](https://img.shields.io/badge/ESLint%20(Next%20core--web--vitals)-4B32C3?logo=eslint&logoColor=white) |
| **Deployment** | ![Vercel](https://img.shields.io/badge/Vercel-000000?logo=vercel&logoColor=white) |

</div>

---

## 📁 Project Structure

```
makaut-toolkit/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout — metadata, fonts, dark mode, analytics
│   │   ├── page.tsx                # Dashboard landing — CTA links to calculators and updates
│   │   ├── icon.png                # App icon (also used as favicon)
│   │   ├── globals.css             # Tailwind v4 theme tokens, dark mode variables, scrollbar utility
│   │   ├── calculators/
│   │   │   └── page.tsx            # Full calculator suite — all tabs, state, validation
│   │   ├── updates/
│   │   │   ├── page.tsx            # Server component — fetches MAKAUT notices via getUpdates()
│   │   │   └── loading.tsx         # Skeleton UI for updates route
│   │   └── about/
│   │       └── page.tsx            # Mission statement + developer profile
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AppLayout.tsx       # Master shell — sidebar, mobile sheet, scroll container
│   │   │   └── AppSidebar.tsx      # Nav links + developer profile footer
│   │   ├── ui/                     # shadcn-style Radix wrappers (Button, Card, Input, Sheet, Tabs…)
│   │   └── UpdatesList.tsx         # Notice cards — NEW badge, view toggle, empty state
│   │
│   ├── lib/
│   │   ├── calculators.ts          # ⭐ Pure formula functions — all business logic lives here
│   │   └── utils.ts                # Tailwind merge utility (cn)
│   │
│   ├── types/
│   │   └── index.ts                # Shared TypeScript interfaces (NavItem, NoticeItem)
│   │
│   └── config/
│       └── nav.ts                  # Navigation link definitions consumed by AppSidebar
│
├── public/                         # Static assets
├── CONTRIBUTING.md
├── SECURITY.md
├── LICENSE
└── README.md
```

---

## 🏗 Architecture

### Rendering Strategy

```
Route            Rendering        Data Source
─────────────────────────────────────────────────────
/                Static           None (pure UI)
/calculators     Client (CSR)     Local state only
/updates         Server (SSR)     MAKAUT external API
/about           Static           None (pure UI)
```

### Updates Data Flow

```
GET /updates
  └─▶ Server Component (updates/page.tsx)
        └─▶ getUpdates()  ──fetch──▶  makaut1.ucanapply.com/smartexam/public/api/notice-data
              └─▶ NoticeItem[]
                    └─▶ <UpdatesList />  (client component)
                          ├─▶ Shows first 6 notices
                          ├─▶ NEW badge on top 3 (position-based)
                          └─▶ View More expands to 12 | View Less collapses + scroll reset
```

### State Management

- **No global store** — local `useState` / `useEffect` only.
- Calculator page holds a single shared `error` string state; tab changes clear it automatically.
- No server actions, no context providers, no Redux/Zustand.

---

## 📐 Business Logic — Formulas

All formulas are implemented as pure functions in `src/lib/calculators.ts`. This section is the canonical reference.

### SGPA → Percentage

```
percentage = (SGPA - 0.75) × 10
```

### YGPA → Percentage (Standard)

```
avgYGPA   = (oddSGPA + evenSGPA) / 2
percentage = (avgYGPA - 0.75) × 10
```

### YGPA → Percentage (Credit-Weighted)

```
weightedYGPA = (oddSGPA × oddCredits + evenSGPA × evenCredits) / (oddCredits + evenCredits)
percentage   = (weightedYGPA - 0.75) × 10

Guard: returns 0 when total credits = 0
```

### Yearly Marks (Scholarship Estimate)

```
Each subject treated as 100 marks total.

oddPercentage  = (oddSGPA  - 0.75) × 10
evenPercentage = (evenSGPA - 0.75) × 10
oddObtained    = oddPercentage  × oddSubjects
evenObtained   = evenPercentage × evenSubjects
totalObtained  = oddObtained + evenObtained
totalMarks     = (oddSubjects + evenSubjects) × 100
overallPct     = (totalObtained / totalMarks) × 100

⚠ Approximate. Not credit-weighted. Subject count range: 1–15.
```

### DGPA by Degree Type

```
4-Year B.Tech:
  DGPA = (YGPA₁ + YGPA₂ + 1.5×YGPA₃ + 1.5×YGPA₄) / 5

Lateral Entry (years 2–4):
  DGPA = (YGPA₂ + 1.5×YGPA₃ + 1.5×YGPA₄) / 4

3-Year Degree:
  DGPA = (YGPA₁ + YGPA₂ + YGPA₃) / 3

2-Year Degree:
  DGPA = (YGPA₁ + YGPA₂) / 2
```

### CGPA (Credit-Weighted)

```
CGPA = Σ(SGPAᵢ × creditsᵢ) / Σ(creditsᵢ)

Only rows where both SGPA > 0 and credits > 0 are included.
Credits input is blocked when parsed value ≥ 50.
```

### Input Validation Rules

| Field | Constraint |
|---|---|
| SGPA inputs | Max `10.0`, up to 3 decimal places, nullable during typing |
| Subject count (yearly marks) | Integer, range `1–15` |
| Credits (CGPA) | Blocked at `>= 50` |
| Result formatting | `toFixed(3)` parsed back to number before display |

---

## ⚡ Getting Started

### Prerequisites

- **Node.js 20+**
- **npm 10+**

### 1. Clone the repository

```bash
git clone https://github.com/Biraj2004/makaut-toolkit.git
cd makaut-toolkit
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser.

> The dev server runs on port **3001** by default (not 3000).

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server on `http://localhost:3001` |
| `npm run build` | Compile and type-check for production |
| `npm run start` | Start production server (requires a prior build) |
| `npm run lint` | Run ESLint with Next.js core-web-vitals rules |

> Always run `npm run lint` and `npm run build` before opening a pull request.

---

## 🤝 Contributing

Contributions are welcome. Please read [CONTRIBUTING.md](CONTRIBUTING.md) for the full workflow.

**Quick summary:**

1. Fork the repository and create a feature branch from `master`.
2. Keep branch names descriptive — e.g., `feature/add-cgpa-validation`, `fix/updates-fetch-fallback`.
3. Keep calculator formulas in `src/lib/calculators.ts` as pure functions.
4. Run `npm run lint` and `npm run build` — both must pass.
5. Test all affected routes manually before opening a PR.
6. Include screenshots or recordings for UI changes.

**Smoke-test checklist before a PR:**

- [ ] `/` — dashboard renders correctly
- [ ] `/calculators` — all tabs: valid input → correct result, invalid input → clear error
- [ ] `/updates` — notices load or empty state shows with portal fallback
- [ ] `/about` — renders without errors
- [ ] Mobile layout — sidebar sheet opens/closes, closes on navigation

---

## 🔒 Security

To report a vulnerability, please follow the responsible disclosure process in [SECURITY.md](SECURITY.md).

**Do not open a public GitHub issue for security vulnerabilities.**
Use GitHub Security Advisories (private report) instead.

---

## 📄 License

This project is licensed under the **MIT License**. See [LICENSE](LICENSE) for full terms.

---

<div align="center">

Built for MAKAUT students, by [Biraj Sarkar](https://github.com/Biraj2004)

<br/>

⭐ If this toolkit helps you, consider starring the repository.

</div>
