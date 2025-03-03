# Playful Data Portfolio

An interactive portfolio project that visualizes data in an engaging way.

## Project Structure

```
├── public/             # Static files
├── src/
│   ├── components/     # React components
│   ├── lib/           # Helper functions and utilities
│   ├── styles/        # CSS and styling
│   └── pages/         # Page components
├── images/            # Image resources
└── tests/            # Test files
```

## Tech Stack

This project is built with modern web technologies:

### Core Technology
- **React**
- **TypeScript**
- **Vite**

### UI & Styling
- **shadcn/ui**
- **Tailwind CSS**
- **Framer Motion**

### Data & State Management
- **React Query**
- **Zustand**

## Getting Started

To run the project locally, you need to have Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

```sh
# Clone the repo
git clone <YOUR_GIT_URL>

# Navigate to the project directory
cd playful-data-portfolio

# Install dependencies
npm install

# Start the development server
npm run dev
```

## How can I deploy this project?

If you want to deploy your project using Netlify, follow these steps:

1. Unhide the following comment in your `vite.config.js` file:
    ```javascript
    build: {
      outDir: 'build/client'
    }
    ```

2. Run the following commands to create the `build/client` directory:
    ```sh
    npm run build
    npm run deploy
    ```