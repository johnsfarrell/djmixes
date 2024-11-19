# DJMixes Client

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Design Overview

### Routes:

- `/` - The home page displays a list of featured mixes and artists.

- `/login` - The login page displays a login form and allows users to log in.

- `/signup` - The signup page displays a signup form and allows users to create a new account.

- `/search` - The search page displays a search bar and search results based on user input.

- `/user/:username` - The user profile page displays a user's profile information and mixes.

- `/mix/:mixId` - The mix detail page displays detailed information about a specific mix.

- `/mix/new` - The new mix page allows users to create a new mix by uploading files and adding metadata.

### Components:

#### Auth:

- Login.tsx

  Manages user authentication, displays the login form, and handles login/logout actions.

  ```tsx
  handleLogin(username: string, password: string): Promise<void>
  handleLogout(): void
  ```

- Signup.tsx

  Manages new user registration, displays the signup form, and handles form submission and validation.

  ```tsx
  handleSignup(userData: object): Promise<void>
  ```

#### Mixes:

- MixDetail.tsx

  Displays detailed information about a specific mix, including title, genre, tags, and comments.

  ```tsx
  getMixDetails(mixId: string): Promise<Mix>
  addComment(mixId: string, comment: string): Promise<void>
  likeMix(mixId: string): Promise<void>
  ```

- MixList.tsx

  Displays a list of all mixes created by the user.

  ```tsx
  getUserMixes(userId: string): Promise<Array<Mix>>
  ```

- NewMixForm.tsx

  Manages the creation of a new mix, allowing users to upload files, add metadata (title, genre, tags), and submit the mix.

  ```tsx
  createMix(mixDetails: object): Promise<Mix>
  uploadFile(file: File): Promise<void>
  handleMixMetadata(metadata: object): void
  ```

#### Search:

- SearchBar.tsx

  Enables search functionality based on search terms or filters by matching terms or artists.

  ```tsx
  searchTerms(term: string): Promise<Array<Mix | Artist>>
  filterResults(criteria: object): Array<Mix | Artist>
  ```

- SearchResults.tsx

  Displays the search results and allows users to sort or filter the results.

  ```tsx
  getSearchResults(query: string): Promise<Array<Mix | Artist>>
  sortResults(order: string): Array<Mix | Artist>
  ```

#### Profile:

- ProfileDetail.tsx

  Displays user profile information and allows the user to update their bio and profile picture.

  ```tsx
  getProfileData(userId: string): Promise<UserProfile>
  updateProfile(userData: object): Promise<void>
  ```

- ProfileSettings.tsx

  Allows users to update account-related settings (e.g., password, notifications).

  ```tsx
  updateSettings(userId: string, settings: object): Promise<void>
  ```

#### Feed:

- CreatorFeed.tsx

  Displays a feed of communications for a particular creator and allows users to post messages or responses.

  ```tsx
  getCreatorFeed(creatorId: string): Promise<Array<Communication>>
  postMessage(creatorId: string, message: string): Promise<void>
  ```

#### UI:

- Button.tsx

  A reusable button component with customizable styles and click handlers.

  Example use cases: login, signup, submit, like, etc.

- Input.tsx

  A reusable input component with customizable styles and input handlers.

  Example use cases: username, password, email, etc.

- Card.tsx

  A reusable card component with customizable styles and content.

  Example use cases: mix, artist, comment, etc.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
