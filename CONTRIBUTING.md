# Contributing to Emergency Medical Services Website

Thank you for considering contributing to our project! This document provides guidelines and instructions for contributing.

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [Development Workflow](#development-workflow)
4. [Pull Request Process](#pull-request-process)
5. [Coding Standards](#coding-standards)
6. [Testing](#testing)
7. [Documentation](#documentation)

## Code of Conduct

This project adheres to a Code of Conduct that all contributors are expected to follow. By participating, you are expected to uphold this code.

## Getting Started

### Prerequisites

- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher) or yarn (v1.22.0 or higher)
- Git

### Setup

1. Fork the repository
2. Clone your fork:
   \`\`\`bash
   git clone https://github.com/your-username/emergency-services-website.git
   cd emergency-services-website
   \`\`\`
3. Install dependencies:
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`
4. Create a new branch for your feature or bugfix:
   \`\`\`bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/issue-you-are-fixing
   \`\`\`

## Development Workflow

1. Make your changes in your feature branch
2. Run the development server to test your changes:
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`
3. Make sure your code follows the project's coding standards
4. Commit your changes with a descriptive commit message
5. Push your branch to your fork
6. Create a pull request

## Pull Request Process

1. Ensure your code follows the project's coding standards
2. Update the README.md or documentation if necessary
3. The pull request will be reviewed by maintainers
4. Address any requested changes
5. Once approved, your pull request will be merged

## Coding Standards

### General Guidelines

- Use TypeScript for all new code
- Follow the existing code style and structure
- Use meaningful variable and function names
- Write comments for complex logic
- Keep functions small and focused on a single task

### TypeScript

- Use proper type annotations
- Avoid using `any` type when possible
- Use interfaces for object shapes
- Use type aliases for complex types

### React

- Use functional components with hooks
- Use the appropriate Next.js patterns (App Router)
- Keep components small and focused
- Use proper prop types
- Follow the component structure in the codebase

### CSS/Styling

- Use Tailwind CSS for styling
- Follow the existing design system
- Ensure responsive design works on all screen sizes
- Test RTL layout for Arabic language support

## Testing

Currently, the project does not have automated tests. However, please manually test your changes thoroughly before submitting a pull request.

### Manual Testing Checklist

- Test on different browsers (Chrome, Firefox, Safari)
- Test on different devices (desktop, tablet, mobile)
- Test with both English and Arabic languages
- Test all interactive elements
- Verify that your changes don't break existing functionality

## Documentation

- Update documentation when adding new features or making significant changes
- Document any new components or utilities
- Add comments to explain complex logic
- Update the README.md if necessary

Thank you for contributing to our project!
