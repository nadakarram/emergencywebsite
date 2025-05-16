# Code Documentation

This document provides detailed information about the codebase structure, key components, and implementation details of the Emergency Medical Services Website.

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Key Components](#key-components)
3. [Data Flow](#data-flow)
4. [Internationalization](#internationalization)
5. [Styling System](#styling-system)
6. [State Management](#state-management)
7. [Utility Functions](#utility-functions)
8. [Extending the Application](#extending-the-application)
9. [Coding Conventions](#coding-conventions)

## Architecture Overview

The application is built using Next.js 14 with the App Router, which provides server-side rendering capabilities and optimized client-side navigation. The architecture follows these principles:

- **Component-Based Structure**: UI is broken down into reusable components
- **Server Components**: Leverages Next.js server components for improved performance
- **Client Components**: Uses client components where interactivity is needed
- **Context API**: Manages global state like language preferences
- **TypeScript**: Ensures type safety throughout the application

### Directory Structure Explanation

- **`app/`**: Contains all pages using the Next.js App Router
- **`components/`**: Reusable UI components
- **`contexts/`**: React context providers for global state
- **`hooks/`**: Custom React hooks
- **`lib/`**: Utility libraries and functions
- **`public/`**: Static assets like images
- **`styles/`**: Global styles and CSS modules
- **`types/`**: TypeScript type definitions
- **`utils/`**: Helper functions and utilities

## Key Components

### 1. Navbar Component

\`\`\`tsx
// components/navbar.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/contexts/language-context'
// ... rest of imports

export default function Navbar() {
  // ... component implementation
}
\`\`\`

The Navbar component handles:
- Navigation between different sections of the application
- Mobile responsive menu toggle
- Language switching button (in some versions)
- Consistent branding across all pages

### 2. Service Providers Component

\`\`\`tsx
// components/service-providers.tsx
'use client'

import { useLanguage } from '@/contexts/language-context'
import Image from 'next/image'
// ... rest of imports

interface ServiceProviderProps {
  serviceType: 'doctor' | 'elderly' | 'therapy' | 'emergency'
  showTitle?: boolean
}

export default function ServiceProviders({ serviceType, showTitle = true }: ServiceProviderProps) {
  // ... component implementation
}
\`\`\`

This component:
- Displays a list of service providers based on the service type
- Shows provider details like name, specialty, rating, etc.
- Supports multilingual content
- Provides contact information for each provider

### 3. Map Component

\`\`\`tsx
// components/map.tsx
'use client'

import { useState, useEffect } from 'react'
import { calculateDistance } from '@/utils/distance'
// ... rest of imports

interface MapProps {
  hospitals: Hospital[]
  userLocation: { lat: number; lng: number }
}

export default function Map({ hospitals, userLocation }: MapProps) {
  // ... component implementation
}
\`\`\`

The Map component:
- Displays hospital locations on a map
- Calculates distances between user and hospitals
- Shows hospital details and directions
- Handles location-based sorting and filtering

### 4. Language Context

\`\`\`tsx
// contexts/language-context.tsx
'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type Language = 'en' | 'ar'
type Direction = 'ltr' | 'rtl'

interface LanguageContextType {
  language: Language
  direction: Direction
  toggleLanguage: () => void
  t: (key: string) => string
}

// ... context implementation
\`\`\`

The Language Context:
- Manages the current language (English or Arabic)
- Provides text direction (LTR or RTL)
- Includes a translation function for all text content
- Allows toggling between languages

## Data Flow

The application uses a combination of approaches for data flow:

1. **Props**: For component-specific data
2. **Context API**: For global state like language preferences
3. **Server Components**: For data fetching and initial state
4. **Client Components**: For interactive elements and user input

### Example Data Flow

1. User selects a medical condition in the Assessment page
2. The condition is passed to the Emergency Form page
3. The form collects additional information
4. The data is used to find matching hospitals
5. Results are displayed with the Map component

## Internationalization

The application supports both English and Arabic languages:

### Translation System

\`\`\`tsx
// contexts/language-context.tsx
const translations = {
  'emergency.title': {
    en: 'Emergency Services',
    ar: 'خدمات الطوارئ'
  },
  // ... more translations
}

// Usage in components
const { t } = useLanguage()
<h1>{t('emergency.title')}</h1>
\`\`\`

### RTL Support

The application automatically adjusts layout direction based on the selected language:

\`\`\`tsx
// app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={language} dir={direction}>
      {/* ... */}
    </html>
  )
}
\`\`\`

## Styling System

The application uses Tailwind CSS for styling:

### Tailwind Configuration

\`\`\`ts
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Custom color palette
      },
      // ... other theme extensions
    },
  },
  plugins: [],
}

export default config
\`\`\`

### Component Styling

Components use Tailwind utility classes for styling:

\`\`\`tsx
<div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md">
  {/* Component content */}
</div>
\`\`\`

### Responsive Design

The application uses Tailwind's responsive modifiers:

\`\`\`tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Responsive grid content */}
</div>
\`\`\`

## State Management

The application uses React's built-in state management solutions:

### Local Component State

\`\`\`tsx
const [isOpen, setIsOpen] = useState(false)
\`\`\`

### Context API for Global State

\`\`\`tsx
const { language, toggleLanguage } = useLanguage()
\`\`\`

## Utility Functions

The application includes several utility functions:

### Distance Calculation

\`\`\`ts
// utils/distance.ts
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  // Implementation of the Haversine formula
}
\`\`\`

### Condition-Service Mapping

\`\`\`ts
// utils/condition-service-mapping.ts
export const conditionServiceMapping: Record<string, string[]> = {
  'heart-attack': ['cardiology', 'emergency'],
  'broken-bone': ['orthopedics', 'radiology'],
  // ... more mappings
}
\`\`\`

## Extending the Application

### Adding a New Page

1. Create a new directory in the `app/` folder
2. Add a `page.tsx` file for the main content
3. Add a `loading.tsx` file for the loading state
4. Update the navbar to include a link to the new page

Example:
\`\`\`tsx
// app/new-service/page.tsx
import { useLanguage } from '@/contexts/language-context'

export default function NewServicePage() {
  const { t } = useLanguage()
  
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">{t('new-service.title')}</h1>
      {/* Page content */}
    </main>
  )
}
\`\`\`

### Adding a New Service Type

1. Update the `ServiceProviderProps` interface in `service-providers.tsx`
2. Add the new service type to the conditional rendering
3. Create provider data for the new service
4. Add translations for the new service

## Coding Conventions

### Naming Conventions

- **Files**: Kebab-case for file names (`service-providers.tsx`)
- **Components**: PascalCase for component names (`ServiceProviders`)
- **Functions**: camelCase for function names (`calculateDistance`)
- **Variables**: camelCase for variable names (`userLocation`)
- **Types/Interfaces**: PascalCase for type names (`Hospital`)

### Component Structure

\`\`\`tsx
// Standard component structure
'use client' // If it's a client component

import { useState } from 'react'
// Other imports

// Types and interfaces
interface ComponentProps {
  // Props definition
}

// Component definition
export default function ComponentName({ prop1, prop2 }: ComponentProps) {
  // State and hooks
  const [state, setState] = useState()
  
  // Helper functions
  const handleEvent = () => {
    // Implementation
  }
  
  // JSX return
  return (
    <div>
      {/* Component content */}
    </div>
  )
}
\`\`\`

### Code Formatting

The project uses ESLint and Prettier for code formatting:

- 2 spaces for indentation
- Single quotes for strings
- Semicolons at the end of statements
- Maximum line length of 80 characters
- No trailing commas in function parameters
- Trailing commas in object and array literals
\`\`\`

Now, let's create a CONTRIBUTING.md file to guide contributors:
