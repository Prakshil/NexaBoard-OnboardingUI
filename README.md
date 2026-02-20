# NexaBoard — Client Onboarding Portal

A modern, multi-step client onboarding web application built with **React**, **TypeScript**, and **Vite**. NexaBoard streamlines the process of collecting client information, service preferences, budget, and project requirements — all in one elegant, animated interface.

---

## 🚀 Features

- **Multi-Step Onboarding Flow** — Guided wizard with 5 structured steps:
  1. **Service Selection** — Choose from Website Build, AI Receptionist, AI Automation, Software Build, AI Analytics, and AI Chatbot
  2. **Business Details** — Industry, company size, and business information
  3. **Budget & Timeline** — Budget range and preferred delivery timeline
  4. **Project Requirements** — Detailed requirements and goals
  5. **Assets & Booking** — Upload assets and schedule a discovery call

- **Admin Dashboard** — Secure admin login to view and manage submitted onboarding requests
- **Smooth Animations** — Powered by [Framer Motion](https://www.framer.com/motion/) for polished transitions
- **Toast Notifications** — Real-time feedback using [react-hot-toast](https://react-hot-toast.com/)
- **Data Visualisation** — Analytics powered by [Recharts](https://recharts.org/)
- **Fully Typed** — Built with TypeScript for reliability and maintainability

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React 19 | UI Framework |
| TypeScript | Type Safety |
| Vite 6 | Build Tool & Dev Server |
| React Router DOM v7 | Client-Side Routing |
| Framer Motion | Animations & Transitions |
| Lucide React | Icon Library |
| Recharts | Data Visualisation |
| react-hot-toast | Toast Notifications |

---

## 📁 Project Structure

```
├── components/
│   ├── onboarding/        # Onboarding step components
│   └── admin/             # Admin dashboard components
├── pages/
│   ├── OnboardingPortal.tsx   # Main onboarding flow page
│   ├── AdminLogin.tsx         # Admin authentication page
│   └── AdminDashboard.tsx     # Admin submissions dashboard
├── services/              # API & service layer
├── constants.tsx          # App-wide constants (services, industries, etc.)
├── types.ts               # TypeScript type definitions
├── App.tsx                # Root component & route configuration
└── index.tsx              # Application entry point
```

---

## ⚡ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [pnpm](https://pnpm.io/) (recommended) or npm

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd Client-Onboarding-web-main

# Install dependencies (using pnpm)
pnpm install

# Or using npm
npm install
```

### Running Locally

```bash
# Start the development server
pnpm dev

# Or using npm
npm run dev
```

The app will be available at **http://localhost:5173**

### Build for Production

```bash
pnpm build

# Preview the production build locally
pnpm preview
```

---

## 🎨 Colour Palette

| Name | Hex |
|---|---|
| Background Black | `#050810` |
| Brand Blue | `#3191C4` |
| Brand Purple | `#6C47FF` |
| Off White | `#F0F4FF` |
| Success Green | `#10B981` |
| Error Red | `#EF4444` |
| Warning Amber | `#F59E0B` |

---

## 📄 License

This project is private and proprietary. All rights reserved.
