# FurEver Family - Custom Instructions

## General Instructions
- Project Type: Pet Adoption and Pet Recipe Website
- Framework: React
- Animation Library: AOS (Animate On Scroll)
- Theme: Warm, friendly, and pet-focused design

## UI Guidelines

### Colors
```css
:root {
    --primary: #FF6B6B;     /* Warm coral */
    --secondary: #4ECDC4;   /* Turquoise */
    --accent: #FFD93D;      /* Sunny yellow */
    --text: #2C3E50;        /* Dark blue-gray */
    --background: #F8F9FA;  /* Light gray */
    --white: #FFFFFF;
}
```

### Typography
```css
:root {
    --heading-font: 'Quicksand', sans-serif;
    --body-font: 'Open Sans', sans-serif;
}
```

### Components Style Guide
- Rounded corners (border-radius: 12px)
- Soft shadows (box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1))
- Micro-interactions on hover
- Responsive design (mobile-first approach)

### Animation Guidelines
```jsx
// Use AOS with these defaults
AOS.init({
    duration: 800,
    easing: 'ease-out',
    once: true
});

// Common animations:
data-aos="fade-up"
data-aos="fade-in"
data-aos="zoom-in"
```

## Rules
1. Component Structure
     - Use functional components with hooks
     - Implement proper prop validation
     - Keep components modular and reusable

2. File Organization
     ```
     src/
     ├── components/
     │   ├── common/
     │   ├── layout/
     │   └── features/
     ├── pages/
     ├── hooks/
     ├── utils/
     └── assets/
     ```

3. Naming Conventions
     - Components: PascalCase (e.g., PetCard)
     - Files: kebab-case (e.g., pet-card.jsx)
     - Hooks: use prefix (e.g., useAuth)

4. Code Style
     - Use ESLint with Airbnb config
     - Implement Prettier for formatting
     - Write JSDoc comments for complex functions

## Required Elements

### Core Components
1. Navigation
     - Responsive navbar
     - Mobile hamburger menu
     - Search functionality

2. Pet Cards
     - Image gallery
     - Basic information
     - Action buttons

3. Recipe Cards
     - Difficulty level
     - Preparation time
     - Ingredients list

4. Forms
     - Adoption application
     - Recipe submission
     - Contact forms

### Pages
1. Home
2. Pet Listings
3. Recipe Collection
4. About Us
5. Contact

### Features
1. Pet filtering system
2. Recipe search
3. Favorites system
4. User authentication
5. Admin dashboard

## Performance Guidelines
- Implement lazy loading for images
- Use React.lazy for code splitting
- Optimize bundle size
- Cache API responses

## Accessibility
- ARIA labels
- Keyboard navigation
- Color contrast compliance
- Screen reader friendly