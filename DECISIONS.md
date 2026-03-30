# Candidate Decisions & Notes

## 1. State Management & Architecture
*Why did you structure your state the way you did? Which patterns did you choose for handling the flaky API requests, loading states, and error handling?*

  The application uses URL-based state management as the single source of truth. Search queries, category filters,
  pagination, and limits are all stored in URL search parameters. This approach provides:

  - Shareable URLs - Users can bookmark or share filtered states
  - Browser back/forward support - Natural navigation history
  - SEO benefits - Server-side rendering friendly

  Patterns for API reliability:

  - React Suspense for async data handling with promise-based loading states
  - Multiple Error Boundaries - Both global (ErrorBoundary) and feature-specific (ProductsErrorFallback)
  - Skeleton components for perceived performance during loading
  - Whitelist validation for category inputs to prevent invalid values
  - Debounced search (500ms) to reduce API calls from rapid typing

  The mock API intentionally has a 20% failure rate, forcing robust error handling with retry functionality and graceful
   fallbacks.

## 2. Trade-offs and Omissions
*What did you intentionally leave out given the constraints of a take-home assignment? If you had more time, what would you prioritize next?*

  If I had more time, I would prioritize:
  1. Automatic retry mechanism for failed API calls with exponential backoff
  2. More granular loading states for different UI sections
  3. Framer Motion animations - The dependency is installed but not utilized
  4. Unit tests for custom hooks and utility functions
  5. Virtual scrolling for large product lists to improve performance
  6. More specific error boundaries for different feature areas

## 3. AI Usage
*How did you utilize AI tools (ChatGPT, Copilot, Cursor, etc.) during this assignment? Provide a brief summary of how they assisted you.*

  I used Claude Code.
  - Code completion suggestions for React component patterns
  - Debugging assistance when troubleshooting Suspense boundary issues
  - Refactoring guidance for extracting reusable hooks
  - TypeScript type definitions for complex interfaces
  - Tailwind CSS class suggestions for styling


## 4. Edge Cases Identified
*Did you notice any edge cases or bugs that you didn't have time to fix? Please list them here.*

Handled edge cases:
  - Empty search results → Empty state component
  - Invalid category values → Whitelist validation
  - Failed image loads → Fallback placeholder with error handling
  - Pagination out-of-bounds → Page number validation

  Potential issues to address:
  - No automatic retry - Failed API calls require manual retry

