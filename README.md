# DevArt 

A modern learning platform built with React, TypeScript, and Firebase. This platform provides an interactive course browsing experience, user authentication, and personalized profile management.

## ✨ Features

- 🔐 **Authentication System** - User registration and login with Firebase Authentication
- 📚 **Course Management** - Browse, search, and explore courses
- 👤 **User Profiles** - Customizable profiles with achievements and course tracking
- 🎯 **Interactive UI** - Modern interface with PrimeReact components and Tailwind CSS
- 📱 **Responsive Design** - Fully responsive across all devices
- 🔍 **Search Functionality** - Advanced course search capabilities
- 🎓 **Learning Progress** - Track achievements and course progress

## 🚀 Tech Stack

- **Frontend Framework**: React 19
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 4
- **UI Components**: PrimeReact, Lucide React, React Icons
- **Routing**: React Router DOM
- **Authentication**: Firebase
- **State Management**: React Hooks & Cookies
- **Package Manager**: pnpm

## 📋 Prerequisites

- Node.js (v18 or higher)
- pnpm (v10.6.3+)
- Firebase account and project setup

## 🛠️ Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd DevArt_Front
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm dev
```

5. Open your browser and navigate to `http://localhost:----`

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server with hot reload |
| `pnpm build` | Build for production |
| `pnpm lint` | Run ESLint for code quality checks |
| `pnpm preview` | Preview production build locally |

## 📁 Project Structure

```
src/
├── components/          # Reusable components
│   ├── Auth/           # Authentication components (Login, Register)
│   ├── Landing/        # Landing page sections (Hero, Courses, FAQ)
│   ├── Profile/        # Profile-related components
│   └── Reusable/       # Shared components (Navbar, Footer)
├── configs/            # Configuration files (Firebase)
├── pages/              # Page components
│   ├── Controllers/    # Page logic controllers
│   └── Reusable/       # Reusable page components
├── utils/              # Utility functions and hooks
├── assets/             # Static assets
└── main.tsx           # Application entry point
```

## 🔑 Key Components

### Pages
- **LandingPage**: Home page with hero, courses, and features
- **LoginPage** / **RegisterPage**: Authentication pages
- **ProfilePage**: User profile with achievements and courses
- **BrowseCoursePage**: Course catalog
- **SearchPage**: Advanced course search
- **PlayPage**: Course player/viewer
- **GeneralCoursePage**: General course information

### Features
- **Protected Routes**: Authenticated user routing
- **New User Detection**: First-time user onboarding
- **Profile Editing**: Customizable user profiles
- **Achievement System**: Track and display user achievements
- **Course Progress**: Monitor learning progress

## 🎨 Styling

The project uses Tailwind CSS 4 with a custom configuration. Styles are organized in:
- `src/index.css` - Global styles
- `src/App.css` - App-specific styles
- Component-level Tailwind classes


## 🚢 Deployment

The project includes a `vercel.json` configuration file for easy deployment on Vercel:

```bash
# Deploy to Vercel
vercel
```

Or build and deploy to any static hosting service:

```bash
pnpm build
# Deploy the 'dist' folder to your hosting provider
```


---

As Usual :) Built with ❤️ using React and TypeScript