// login route
export const LOGIN = '/login' // NOTE: Should match with routes defined inside pages object(in CredentialsProvider) if you have it, or with default

// root route(where user will be redirected if he/she is authenticated but tries to go to login/register page)
export const ROOT = '/notes'

// auth routes
export const AUTH_ROUTES = ['/login', '/registration']

// private routes
export const PROTECTED_ROUTES = ['/posts', '/notes', '/users']
