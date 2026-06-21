# Automation Exercises with Playwright

A Playwright-based automation project for functional UI testing of the Automation Exercise demo site. The purpose of this repository is for study purposes only.

## Project Overview

This repository contains a Playwright test suite built with TypeScript and a Page Object Model structure.

## Tech Stack

- `@playwright/test` for browser automation and assertions
- `@faker-js/faker` for test data generation
- `dotenv` for optional environment configuration
- `TypeScript` with `commonjs` module support

## Repository Structure

- `playwright.config.ts` - Playwright test configuration and browser project setup
- `pages/` - Page object model classes for reusing page behavior
- `src/` - Main test source files
  - `data/` - test data sources and text constants
  - `elements/` - locator definitions organized by page
  - `fixtures/` - custom fixtures and test setup utilities
  - `specs/` - Playwright test files
  - `utils/` - helper utilities such as Faker wrappers
- `playwright-report/` - generated HTML reports from Playwright runs
- `test-results/` - artifacts and historical run results

## Prerequisites

Before running this project, ensure you have the following installed on your machine:

- **Node.js** (version 16 or higher)
- **npm** (bundled with Node.js)
- **Git** (for cloning the repository)

### Installation Guide for Beginners

#### 1. Install Node.js and npm

**Windows:**
1. Visit [nodejs.org](https://nodejs.org/)
2. Download the LTS (Long Term Support) version
3. Run the installer and follow the setup wizard
4. Accept default settings and install both Node.js and npm
5. Restart your terminal/command prompt

**macOS:**
```bash
# Using Homebrew (if not installed, visit https://brew.sh/)
brew install node
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install nodejs npm
```

#### 2. Verify Installation

Open terminal/command prompt and run:

```bash
node --version
npm --version
git --version
```

You should see version numbers for all three.

#### 3. Clone the Repository

```bash
git clone <repository-url>
cd automation-exercises-playwright
```

#### 4. Install Project Dependencies

This command will install all required npm packages **and automatically install Playwright browsers**:

```bash
npm install
```

If you already have the project installed and need to install Playwright browsers separately:

```bash
npm run browsers:install
```

For Linux users, install system dependencies:

```bash
npm run browsers:system
```

#### 5. Configure Environment Variables

1. Create a `.env` file in the project root (if it doesn't exist)
2. Add the following variables:

```env
BASE_URL=https://www.automationexercise.com/
TEST_USER_EMAIL=your-test-email@example.com
TEST_USER_PASSWORD=your-test-password
TEST_USER_FULL_NAME=Your Test User Name
```

> **Note:** The `.env` file is already provided in the repository with default test credentials.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Optionally configure environment variables using a `.env` file.
   The project includes commented dotenv setup in `playwright.config.ts`.

## Running Tests

### Available Commands

**Run all tests:**
```bash
npm test
```

**Run tests with UI mode (interactive):**
```bash
npm run test:ui
```

**Run tests in headed mode (visible browser):**
```bash
npm run test:headed
```

**Run tests in debug mode:**
```bash
npm run test:debug
```

**Run API tests only:**
```bash
npm run test:api
```

**Run smoke tests (marked with @smoke):**
```bash
npm run test:smoke
```
> **Note:** The project does not  have smoke tests defined yet.

**Run regression tests (marked with @regression):**
```bash
npm run test:regression
```
> **Note:** The project does not  have regression tests defined yet.

**Run a specific test file:**
```bash
npx playwright test src/specs/login.spec.ts
```

**Open the HTML report after a test run:**
```bash
npm run report
```

## Configuration Highlights

- Tests are located in `./src/specs`
- Base URL is set to `https://www.automationexercise.com/` (configurable via `.env`)
- Browser: Chromium by default
- Screenshot capture is enabled on failure
- Trace collection is enabled on first retry
- Parallel execution is optimized for CI/local environments

## Troubleshooting

### Common Issues

**Issue: "playwright not found" or "browsers not installed"**
```bash
npm install
npm run browsers:install
```

**Issue: Tests timeout or fail to load pages**
- Ensure `BASE_URL` is correct in `.env`
- Check your internet connection
- Verify the Automation Exercise website is accessible

**Issue: Permission denied errors on Linux/macOS**
```bash
chmod +x node_modules/.bin/playwright
```

**Issue: System dependencies missing (Linux)**
```bash
npm run browsers:system
```

## Notes

- `headless` is currently set to `true` for visible browser execution (modify in `playwright.config.ts` if needed).
- Additional browser projects (`firefox`, `webkit`, mobile views) are present but commented out in `playwright.config.ts`.
- You can enable `dotenv` features by uncommenting the import and config lines in `playwright.config.ts`.
- For CI/CD pipelines, set environment variables directly instead of using `.env` file.

## Support

For issues or questions:
1. Check [Playwright Documentation](https://playwright.dev/)
2. Review [Automation Exercise Website](https://www.automationexercise.com/)
3. Check the project's issue tracker
