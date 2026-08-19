import { auth } from '@/auth'
import { NextResponse } from 'next/server'
import { AUTH_ROUTES, LOGIN, PROTECTED_ROUTES, ROOT } from './lib/routes'

export default auth((req) => {
  const isAuthenticated = !!req.auth
  const pathname = req.nextUrl.pathname.replace(/\/$/, '')

  const isAuthRoute = AUTH_ROUTES.some((route: string) => {
    return pathname.startsWith(route)
  })
  const isProtectedRoute = PROTECTED_ROUTES.some((route: string) => {
    return pathname.startsWith(route)
  })

  // console.log("middleware.ts auth vars", {
  //   pathname: pathname,
  //   isAuthenticated: isAuthenticated,
  //   isProtectedRoute: isProtectedRoute,
  //   isAuthRoute: isAuthRoute,
  // });

  if (pathname.length === 0) {
    return NextResponse.redirect(new URL(ROOT, req.url))
  }

  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL(LOGIN, req.nextUrl))
  }

  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL(ROOT, req.url))
  }

  return NextResponse.next()
})

// NOTE: (Conditinal redirect) This matcher with regex will only be applied to everything that is inside the app folder and nothing outside of it. In summary, this config ensures that your middleware runs on:
// 1. All non-static page routes (like /dashboard, /about, etc.)
// 2. The homepage /
// 3. API and tRPC endpoints (/api/*, /trpc/*)
// It excludes:
// 1. Static files like images, stylesheets, fonts
// 2. Internal _next/* files (e.g., JavaScript bundles)
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
  // matcher: ["/((?!_next/static|_next/image|favicon.ico|icons|public|.*\\.svg$|.*\\.png$|.*\\.jpg$).*)"],
}
