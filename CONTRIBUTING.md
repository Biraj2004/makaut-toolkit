# Contributing to MAKAUT Toolkit

Thanks for your interest in improving this project.

## Prerequisites

- Node.js 20+
- npm 10+

## Local Setup

1. Fork and clone the repository.
2. Install dependencies:
   - `npm install`
3. Start the development server:
   - `npm run dev`
4. Run quality checks before pushing:
   - `npm run lint`
   - `npm run build`

The app runs at `http://localhost:3001` by default.

## Branch and Commit Guidelines

- Create a feature branch from `master`.
- Keep branch names descriptive, for example:
  - `feature/add-cgpa-validation`
  - `fix/updates-fetch-fallback`
- Use clear commit messages that explain why the change was made.

## Code Guidelines

- Keep calculator formulas in `src/lib/calculators.ts` where possible.
- Keep UI behavior and formula hints consistent.
- Do not introduce unrelated refactors in the same pull request.
- Preserve responsiveness and accessibility for mobile and desktop.

## Pull Request Checklist

Before opening a PR, confirm:

- The change is scoped and reviewed locally.
- `npm run lint` passes.
- `npm run build` passes.
- The affected routes were manually tested.
- Screenshots or short recordings are included for UI changes.
- Related issues are linked, if any.

## Reporting Bugs and Requesting Features

- Use GitHub Issues.
- Include reproducible steps and expected behavior.
- Add screenshots or logs when helpful.

## Security Issues

Please do not report security vulnerabilities in public issues.
Use the process described in [SECURITY.md](SECURITY.md).
