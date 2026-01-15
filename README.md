# MAKAUT Toolkit

![Version](https://img.shields.io/badge/version-1.0.0-emerald.svg)
![Next.js](https://img.shields.io/badge/Next.js-16.1-black)
![React](https://img.shields.io/badge/React-19-blue)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-4.0-cyan)
![License](https://img.shields.io/badge/license-MIT-green)

The **MAKAUT Toolkit** is an all-in-one web application designed for students of Maulana Abul Kalam Azad University of Technology (MAKAUT). It simplifies academic management by providing robust grade calculators, real-time university updates, and scholarship eligibility tools.

## 🌐 Live Demo

Check out the live application here: [**Live Preview**](https://makaut-toolkit.vercel.app)

## 🚀 Features

### 1. Advanced Grade Calculators

Comprehensive tools handling complex university formulas:

- **SGPA to Percentage**: Convert semester grades to percentage instantly.
- **YGPA to Percentage**: Calculate annual percentage from Odd & Even sem SGPAs.
  - *Bonus*: Displays **Yearly Average YGPA** alongside percentage.
- **Yearly Marks Calculator**: Essential for **Scholarship Renewals** (SVMCM, OASIS, Aikashree).
  - Calculates **Total Marks** & **Obtained Marks** based on subject count.
  - **Important Note**: Includes a warning that Yearly Marks Calculator's percentage results are approximate (%) conversions. Rest all calculations are accurate.
- **DGPA Calculator**: Supports all degree types:
  - 4-Year B.Tech (Weighted calculation).
  - Lateral Entry (Weighted from 2nd year).
  - 3-Year & 2-Year Degrees.
- **CGPA Calculator**: Flexible semester inputs (from 2 to 10 semesters) with credit-weighted logic.

### 2. Live University Updates

- **Automated Tracking**: Fetches official notices from the MAKAUT API.
- **Smart Caching (ISR)**: Updates typically refresh every **24 hours** to balance speed and server load.
- **"NEW" Badge Logic**: Automatically highlights the top 3 most recent notices.
- **View Controls**: Expand/Collapse list with smooth scrolling.

### 3. Modern UI/UX

- **Dark Mode First**: Sleek, eye-friendly interface.
- **Responsive Design**: Optimized for Mobile, Tablet, and Desktop.
- **Accessibility**: Screen-reader friendly (ARIA labels, Sheet Descriptions).
- **Performance**: Optimized images (`next/image` with proper sizing) and font loading.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Components**: [Radix UI](https://www.radix-ui.com/) (Primitives for accessible components)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Font**: Geist Sans & Geist Mono

## 📂 Project Structure

```bash
src/
├── app/
│   ├── calculators/    # Calculator Tab Logic
│   ├── updates/        # Updates Page & ISR Fetching
│   ├── layout.tsx      # Root Layout & Providers
│   └── page.tsx        # Homepage
├── components/
│   ├── layout/         # Sidebar, Navbar, Mobile Menu
│   ├── ui/             # Reusable UI Components (Cards, Buttons, Inputs)
│   └── UpdatesList.tsx # Updates Display Component
├── lib/
│   ├── calculators.ts  # Core Calculation Logic (Pure Functions)
│   └── utils.ts        # Tailwind merge utilities
└── config/             # Navigation config
```

## ⚡ Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/makaut-toolkit.git
   cd makaut-toolkit
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server:**

   ```bash
   npm run dev
   ```

4. **Open locally:**

   Navigate to [http://localhost:3001](http://localhost:3001).

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/NewFeature`).
3. Commit your changes.
4. Push to the branch.
5. Open a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the `LICENSE` file for details.
