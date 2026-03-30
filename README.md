# Decision Tree Builder

Decision Tree Builder is a frontend-only web app for building, visualising, and evaluating hierarchical decision trees. It features an expandable tree UI and an interactive evaluation session to walk through decisions step by step.

## Features

- **Nested Tree Structure**: Build complex decision trees easily via an expandable, file-explorer-like node tree.
- **Inline Editing**: Quickly change question texts, branch labels, and outcome results directly on the tree nodes.
- **Interactive Evaluation**: Run an interactive dialog session to step through the decision path and reach a final outcome.
- **Modern UI**: Polished, responsive user interface utilizing `shadcn/ui`, `Tailwind CSS`, and `lucide-react` icons. 

## Tech Stack

- [Next.js](https://nextjs.org/) (Static Export Mode)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)

## Getting Started

First, install the dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Building for Production

This project is configured for static export. To generate the static files:

```bash
npm run build
```

The output will be placed in the `out` directory.
