# Emergency Medical Services Website

![Emergency Services Logo](/public/images/emergency-logo.png)

A comprehensive platform connecting users with emergency medical services, home healthcare, elderly care, and physical therapy services.

## 🚀 Features

- **Emergency Service Finder**: Find the nearest hospital based on your medical condition
- **Doctor Visits**: Connect with qualified doctors for home visits
- **Elderly Care**: Find caregivers specialized in elderly care
- **Physical Therapy**: Connect with professional physical therapists
- **Multilingual Support**: Full Arabic and English language support
- **Responsive Design**: Works on all devices (mobile, tablet, desktop)
- **Location Services**: Find the nearest service providers

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18.0.0 or higher)
- [npm](https://www.npmjs.com/) (v9.0.0 or higher) or [yarn](https://yarnpkg.com/) (v1.22.0 or higher)
- [Git](https://git-scm.com/)

## 🔧 Installation

Follow these steps to get the project running on your local machine:

1. **Clone the repository**

\`\`\`bash
git clone https://github.com/yourusername/emergency-services-website.git
cd emergency-services-website
\`\`\`

2. **Install dependencies**

\`\`\`bash
npm install
# or
yarn install
\`\`\`

3. **Run the development server**

\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

4. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000) to see the application running.

## 🏗️ Project Structure

\`\`\`
emergency-services-website/
├── app/                    # Next.js App Router pages
│   ├── assessment/         # Medical condition assessment
│   ├── doctor-visits/      # Doctor visits service
│   ├── elderly-care/       # Elderly care service
│   ├── emergency-form/     # Emergency form
│   ├── homepage/           # Homepage
│   ├── hospitals/          # Hospitals listing
│   ├── physical-therapy/   # Physical therapy service
│   ├── globals.css         # Global styles
│   └── layout.tsx          # Root layout
├── components/             # Reusable components
│   ├── ui/                 # UI components (shadcn/ui)
│   ├── map.tsx             # Map component
│   ├── navbar.tsx          # Navigation bar
│   └── service-providers.tsx # Service providers component
├── contexts/               # React contexts
│   └── language-context.tsx # Language context for i18n
├── hooks/                  # Custom React hooks
├── lib/                    # Utility libraries
├── public/                 # Static assets
│   └── images/             # Image assets
├── styles/                 # Additional styles
├── types/                  # TypeScript type definitions
├── utils/                  # Utility functions
├── next.config.mjs         # Next.js configuration
├── postcss.config.mjs      # PostCSS configuration
├── tailwind.config.ts      # Tailwind CSS configuration
└── tsconfig.json           # TypeScript configuration
\`\`\`

## 🔄 Available Scripts

- `npm run dev` - Run the development server
- `npm run build` - Build the application for production
- `npm start` - Start the production server
- `npm run lint` - Run ESLint to check code quality

## 🌐 Deployment

This project is configured for easy deployment on [Vercel](https://vercel.com/). Simply connect your GitHub repository to Vercel for automatic deployments.

For other platforms, build the project using:

\`\`\`bash
npm run build
# or
yarn build
\`\`\`

Then deploy the generated `.next` folder according to your hosting provider's instructions.

## 🧩 Key Components

### Language Context

The application supports both Arabic and English languages using a custom language context:

\`\`\`tsx
// contexts/language-context.tsx
import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'ar';
type Direction = 'ltr' | 'rtl';

interface LanguageContextType {
  language: Language;
  direction: Direction;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

// ... rest of the implementation
\`\`\`

### Service Providers Component

Reusable component for displaying service providers:

\`\`\`tsx
// components/service-providers.tsx
import { useLanguage } from '@/contexts/language-context';
// ... other imports

interface ServiceProviderProps {
  serviceType: 'doctor' | 'elderly' | 'therapy' | 'emergency';
  showTitle?: boolean;
}

// ... component implementation
\`\`\`

### Map Component

Handles location and mapping functionality:

\`\`\`tsx
// components/map.tsx
import { useState, useEffect } from 'react';
// ... other imports

interface MapProps {
  hospitals: Hospital[];
  userLocation: { lat: number; lng: number };
}

// ... component implementation
\`\`\`

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Contact

For any questions or support, please contact [nada240103522@sut.edu.eg](mailto:your-email@example.com).
\`\`\`

Now, let's create a detailed code documentation file:
