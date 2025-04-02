![image](https://github.com/user-attachments/assets/1b562f6b-1bd1-4e36-80fb-dd050914d367)


# What's That Tech?

A web application that analyzes websites to detect the technologies they're using. Built with Nuxt 3 and powered by the whats-that-tech package.

## Features

- Enter any URL to analyze
- Detects various technologies including:
  - Frameworks
  - Content Management Systems (CMS)
  - Programming Languages
  - Databases
  - Servers
  - DevOps Tools
  - CI/CD Platforms
  - Cloud Services
- Real-time progress tracking during analysis
- Clean and intuitive user interface

## How It Works

1. Enter a URL in the input field
2. The application will analyze the website using whats-that-tech
3. Results are displayed showing all detected technologies with their categories and confidence levels

## Usage

1. Clone the repository:
```bash
git clone https://github.com/yourusername/whats-that-tech-demo.git
cd whats-that-tech-demo
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server and automatically open in your browser:
```bash
pnpm dev -o
```

4. Enter any URL in the input field and click "Analyze" to detect technologies

## Development Commands

```bash
# Start development server (without auto-opening)
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Technologies Used

- Nuxt 3
- Vue 3
- Tailwind CSS
- whats-that-tech
- TypeScript

## License

MIT
