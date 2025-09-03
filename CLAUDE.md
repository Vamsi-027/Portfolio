# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `npm start` - Start development server (React app)
- `npm run build` - Build production bundle
- `npm test` - Run test suite with Jest
- `npm run eject` - Eject from create-react-app (irreversible)

### Linting & Code Quality
- No specific lint command configured - uses ESLint through react-scripts with "react-app" and "react-app/jest" configs

## Architecture Overview

### Tech Stack
- **Frontend Framework**: React 19.0.0 with functional components and hooks
- **Styling**: TailwindCSS with custom theme configuration
- **Animations**: Framer Motion for page transitions and component animations
- **Icons**: React Icons (Font Awesome, Simple Icons, Devicons)
- **Lottie**: Lottie-react for animated graphics (tech stack icons in `/src/lottie/`)
- **Build Tool**: Create React App (react-scripts 5.0.1)
- **Intersection Observer**: react-intersection-observer for scroll-triggered animations

### Project Structure
```
src/
├── components/           # React components (functional with hooks)
│   ├── Hero.js          # Landing hero section with animated text rotation
│   ├── About.js         # About me section
│   ├── Skills.js        # Skills showcase with progress bars
│   ├── Projects.js      # Project portfolio
│   ├── Experience.js    # Work experience timeline
│   ├── Contact.js       # Contact form
│   ├── Header.js        # Navigation header
│   ├── Footer.js        # Footer component
│   ├── CustomAlert.js   # Alert system with context
│   ├── ScrollToTop.js   # Scroll to top functionality
│   └── NetworkAccessNotice.js
├── lottie/              # Lottie animation files (JSON)
├── App.js              # Main app component with AlertContext
├── index.js            # React app entry point
└── App.css, index.css  # Global styles
```

### Key Architectural Patterns

#### Context-Based Alert System
- `AlertContext` in App.js provides global alert management
- `useCustomAlert` hook from CustomAlert.js for alert operations
- Components can trigger alerts via `useAlert()` hook

#### Animation Architecture
- Framer Motion used throughout for page transitions
- `useInView` hook for scroll-triggered animations with `triggerOnce: true`
- Custom Tailwind animations (fade-in, slide-up, float) defined in `tailwind.config.js`
- Staggered children animations in container components

#### Component Patterns
- All components are functional with React hooks
- Consistent use of `useInView` from react-intersection-observer
- Motion variants pattern for consistent animation timing
- Icon components from react-icons with consistent styling

#### Styling Approach
- TailwindCSS with custom theme extensions
- Dark mode support configured (`darkMode: 'class'`)
- Custom fonts: Inter (default), Pixelify Sans, Silkscreen
- Gradient backgrounds and glassmorphism effects
- Responsive design with mobile-first approach

### Notable Implementation Details

#### Hero Section (`Hero.js`)
- Text rotation animation with 3-second intervals
- Floating tech icons with individual animation delays
- Smooth scroll navigation to other sections
- Performance stats display with animated counters

#### Skills Section (`Skills.js`)
- Categorized skill display with progress bars
- Individual skill items with staggered animations
- Experience indicators for each technology
- Animated progress bars that fill on scroll

#### Tailwind Configuration
- Custom color palette with primary blues
- Extended animations and keyframes
- Custom font families for branding
- Responsive breakpoint usage throughout components

### Portfolio Content
This is Vamsi Cheruku's personal portfolio showcasing:
- Backend engineering experience at Zoho Corporation
- Skills in Java, Spring Boot, Python, Django, databases (MySQL, Redis)
- DevOps experience with Docker, AWS, Kubernetes
- Performance achievements (1M+ messages/day, 40% performance boost)