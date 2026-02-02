# UCF Search React Application - AI Agent Instructions

## Project Overview
This is a React-based search application using TypeScript, Vite, and Google Custom Search Engine integration. The application provides a unified search interface for UCF content with location-aware results and spotlight features.

## Key Architecture Components

### Search Context Management
- Global search state is managed through React Context (`src/SearchContext.ts` and `SearchContextProvider.tsx`)
- Components can access and update search state using the `useContext` hook

### Core Components Structure
- `App.tsx`: Entry point, handles Google CSE initialization and layout
- `SearchBar.tsx`: Main search input interface
- `SearchResults.tsx`: Renders Google Custom Search results
- `LocationResults.tsx`: Location-aware search results
- `Spotlight.tsx`: Featured content section

### External Integrations
- Google Custom Search Engine (CSE) integration in `App.tsx`
- Environment variable `VITE_SEARCH_ENGINE_ID` required for CSE configuration

## Development Workflow

### Setup and Installation
```bash
npm install
```

### Development Commands
- `npm run dev` - Start development server with HMR
- `npm run build` - Build production bundle
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint checks

### Environment Requirements
- Node.js ≥ 22.0.0
- npm > 10.0.0

## Project Conventions

### Styling
- SCSS modules for component-specific styles
- UCF Athena Framework (`ucf-athena-framework`) for base styling
- Component styles follow `ComponentName.scss` pattern

### TypeScript Configuration
- Strict type checking enabled
- Separate configs for app (`tsconfig.app.json`) and Node (`tsconfig.node.json`)

### Component Organization
- React functional components with TypeScript
- Props interfaces defined in separate type files under `src/types/`
- Context-based state management for search functionality

## Key Files for Reference
- `src/App.tsx` - Main application structure and CSE initialization
- `src/SearchContextProvider.tsx` - Global search state management
- `src/components/SearchResults.tsx` - Google CSE results integration
- `.env` - Required for `VITE_SEARCH_ENGINE_ID` configuration

## Common Tasks

### Adding New Search Features
1. Update search context if needed (`SearchContext.ts`)
2. Create new component in `src/components/`
3. Add component-specific styles in matching SCSS file
4. Import and integrate in relevant parent component

### Modifying Search Behavior
1. CSE configuration changes in `App.tsx`
2. Search context updates in `SearchContextProvider.tsx`
3. Update relevant component implementations
