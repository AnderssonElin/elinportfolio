# Playful Data Portfolio

An interactive and playful portfolio project that visualizes data in an engaging way.

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
- **React** - A JavaScript library for building user interfaces
- **TypeScript** - Typed JavaScript for better development experience
- **Vite** - Fast and modern build tool for web development

### UI & Styling
- **shadcn/ui** - Reusable UI components
- **Tailwind CSS** - A utility-first CSS framework
- **Framer Motion** - For animations and interactions

### Data & State Management
- **React Query** - For data handling and caching
- **Zustand** - Simple and efficient state management

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

## Contributing

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
