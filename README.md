# `klearlink-demo`

A React Material UI dashboard for configuring and executing HTTP requests (GET, POST, PUT, DELETE) and displaying the results in a tree view.

## Features

- Request configuration with method selection, URL input, headers, and body
- Use cases with pre-configured examples
- Response viewer with tabs for body, headers, and raw data
- Pattern matching for remote data state management
- Custom KlearLink theme with gold and dark styling

## Tech Stack

- Next.js (App Router)
- Material UI
- TypeScript
- Axios for HTTP requests

## Project Structure

- `/app`: Next.js app router pages
- `/components`: React components for the dashboard
- `/lib`: Utility functions, theme, and pattern matching
- `/types`: TypeScript type definitions

## Getting Started

1. Install dependencies:
   \`\`\`bash
   npm install

# or

yarn install
\`\`\`

2. Run the development server:
   \`\`\`bash
   npm run dev

# or

yarn dev
\`\`\`

3. Open [http://localhost:3000](http://localhost:3000) in your browser to see the dashboard.

## Notes

This project uses Material UI components directly rather than shadcn/ui components.
