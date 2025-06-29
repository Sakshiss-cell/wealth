// middleware.ts — Runs before app loads to protect routes

import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Define protected routes: user must be logged in to access these
const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/account(.*)',
  '/transaction(.*)', // ✅ added leading slash for consistency
]);

/**
 * Clerk middleware wrapper with custom logic
 * - Checks if route is protected
 * - If user is not logged in, redirect to sign-in
 */
export default clerkMiddleware(async (auth, req) => {
  const { userId, redirectToSignIn } = await auth();

  // If route is protected and no user is logged in, redirect
  if (!userId && isProtectedRoute(req)) {
    return redirectToSignIn();
  }

  // Continue normally otherwise
});

/**
 * Configuration for matching routes that should be processed by middleware
 * - Skips _next (Next.js internals) and static assets
 * - Always runs for API and TRPC routes
 */
export const config = {
  matcher: [
    // Exclude Next.js internals and common static files
    '/((?!_next|favicon.ico|[^/]+\\.(?:js|css|json|png|jpg|jpeg|svg|gif|webp|ico|ttf|woff2?|eot)).*)',
    // Always match API and TRPC routes
    '/(api|trpc)(.*)',
  ],
};
