# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `npm run dev` - Start Next.js development server
- `npm run build` - Build production bundle
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Linting & Code Quality
- ESLint configured with `eslint-config-next`

## Architecture Overview

### Tech Stack
- **Frontend Framework**: Next.js 14 with React 18 (App Router)
- **Styling**: TailwindCSS with custom theme configuration
- **Animations**: Framer Motion for page transitions and component animations
- **Icons**: React Icons (Font Awesome)
- **Build Tool**: Next.js
- **Image Optimization**: Next.js Image component with remote patterns for Google Drive

### Project Structure
```
├── app/
│   ├── layout.js        # Root layout with Sidebar
│   ├── page.js          # Home page with main sections
│   └── globals.css      # Global Tailwind styles
├── components/
│   ├── HeroStatus.js    # Landing hero with typing animation and profile
│   ├── MissionLog.js    # Projects/portfolio section
│   ├── Experience.js    # Work experience timeline
│   ├── Directives.js    # Skills and technical expertise
│   ├── CommsLink.js     # Contact section
│   └── Sidebar.js       # Fixed navigation sidebar
└── public/images/       # Static assets
```

### Key Architectural Patterns

#### Layout Architecture
- Next.js App Router with `app/layout.js` providing root layout
- Fixed sidebar navigation with `Sidebar.js` component
- Main content area with responsive design (`ml-64` offset for sidebar)
- Smooth scroll behavior enabled globally

#### Animation Architecture
- Framer Motion used throughout for page transitions and micro-interactions
- Motion variants pattern with staggered children animations
- Custom Tailwind animations (fade-in, slide-up, float, pulse-green) in `tailwind.config.js`
- Typing animations and dynamic text effects in hero section

#### Component Patterns
- All components use 'use client' directive (client-side rendering)
- Functional components with React hooks (useState, useEffect)
- Motion components from Framer Motion for animations
- Consistent icon usage from react-icons/fa

#### Styling Approach
- TailwindCSS with custom theme extensions
- Inter font family as default
- Custom color palette with primary blues
- Gradient backgrounds and glass-morphism effects
- Responsive design with mobile-first approach

### Notable Implementation Details

#### HeroStatus Component (`HeroStatus.js`)
- Dynamic typing animation rotating through backend engineering keywords
- Real-time system status simulation with pulse effects
- Performance badges with metrics (uptime, scale, performance improvements)
- Professional photo with overlay badges and live indicators

#### Sidebar Navigation (`Sidebar.js`)
- Fixed positioning with active section tracking via scroll
- Real-time UTC clock display
- Professional branding with logo and status indicators
- Social links with hover animations

#### Tailwind Configuration (`tailwind.config.js`)
- Custom animations: fade-in, slide-up, float, pulse-green
- Extended color palette with primary blue variants
- Custom keyframe definitions for smooth animations

### Portfolio Content
This is Vamsi Cheruku's personal portfolio showcasing:
- Backend engineering experience at Zoho Corporation
- Skills in Java, Spring Boot, Python, Django, databases (MySQL, Redis)
- DevOps experience with Docker, AWS, Kubernetes
- Performance achievements (1M+ messages/day, 40% performance boost)