# UniMate

UniMate is a university social app for discovering activities, sharing Moments, joining activity group chats, and participating in anonymous Campus Tea discussions.

## Current state

The interface is intentionally data-driven and starts with empty states. It does not ship fictional users, activities, chat messages, engagement counts, places, or social posts.

Firebase integration is scaffolded but not connected. The service modules in `js/services/` return no data until Firebase authentication, Firestore, and Storage are configured.

## Pages

- `index.html` — sign-in entry
- `home.html` — activity discovery
- `create-activity.html` — activity form
- `activity.html` — activity details and joining
- `moments.html` — 48-hour Moment feed and composer
- `campus-tea.html` — public anonymous Tea feed
- `chats.html` — joined activity group chats
- `profile.html` — authenticated user profile

## Firebase next steps

1. Add Firebase SDKs and the project configuration in `js/firebase.js`.
2. Implement Google or Firebase Auth in `js/auth.js`.
3. Replace the empty service implementations with Firestore and Storage queries/mutations.
4. Enforce Firestore rules so Tea authors are known to the backend but never returned in public Tea views.
5. Add the Google OAuth web client ID to the `google-client-id` meta tag in `index.html`.

## Local preview

Serve the project directory with any static server, then open `index.html`.
