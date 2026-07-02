# Xuman

A knowledge-sharing marketplace mobile app. Creators publish short-form vertical videos; users watch reels, explore creator profiles, and book paid consultation calls.

Built with React Native (Expo).

## Tech Stack

- Expo (SDK 57) + Expo Router
- TypeScript (strict)
- NativeWind
- React Native Reanimated + Gesture Handler
- Zustand
- React Hook Form
- Axios

## Getting Started

```bash
npm install
npm start
```

Then press `i` for iOS simulator, `a` for Android emulator, or scan the QR code with Expo Go.

## Project Structure

```
src/
├── app/          # Expo Router routes
├── components/   # Reusable UI, grouped by feature
├── screens/      # Screen implementations
├── services/     # API clients (mock fallbacks while backend is in development)
├── store/        # Zustand stores, one per feature
├── hooks/        # Shared hooks
├── theme/        # Design tokens
├── constants/    # App constants
├── types/        # Shared TypeScript types
├── mock/         # Mock data and responses
└── utils/        # Helpers
```

## Development Workflow

- Feature branches: `feature/<feature-name>`
- Conventional Commits
- Every feature lands through a pull request — no direct commits to `main`
