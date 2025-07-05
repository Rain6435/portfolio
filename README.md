# Portfolio Website

A modern React portfolio website built with Vite, showcasing interactive projects and professional experience.

## Features

- **Interactive Portfolio**: Personal homepage with hero section, about, experience, and contact information
- **Project Showcase**: Multiple interactive project demonstrations including:
  - Memory Flow Game (pattern matching, sequence, and spatial memory games)
  - E-commerce Site (product catalog, shopping cart, checkout)
  - Service Site (veterinary/appointment booking system)
  - Analytics Dashboard
- **Responsive Design**: Built with Bootstrap 5 and Tailwind CSS
- **Modern Routing**: TanStack Router for client-side navigation

## Tech Stack

- **Frontend**: React 19, Vite 6
- **Styling**: Bootstrap 5, Tailwind CSS 4, DaisyUI
- **Routing**: TanStack Router
- **Icons**: Bootstrap Icons, Lucide React
- **Build Tool**: Vite with React plugin

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── MemoryFlow/     # Memory game components
│   └── ...             # Portfolio sections (About, Experience, etc.)
├── pages/              # Route pages
│   ├── Ecommerce/      # E-commerce demo components
│   ├── ServiceSite/    # Service site demo components
│   └── ...             # Other project pages
├── layouts/            # Layout components
├── router/             # Route configuration
├── styles/             # Global styles
└── assets/             # Static assets
```

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to GitHub Pages
npm run deploy
```

## Development

- **Linting**: ESLint with React hooks and refresh plugins
- **Hot Reload**: Vite HMR for fast development
- **Deployment**: GitHub Pages integration
