// types/next-auth.d.ts
import { DefaultSession, DefaultUser } from 'next-auth'
import { DefaultJWT } from 'next-auth/jwt'

declare module 'next-auth' {
  // Extending DefaultUser because it has id?: string not id: string
  // Used in: authorize() return value and jwt() callback's `user` param
  // This is what your authorize() function must return
  interface User extends DefaultUser {
    id: string
    accessToken: string
    name: string
    role: string
  }

  // Used in: session() callback and useSession()/auth() in components
  // This is what your frontend gets when calling session.user
  interface Session {
    user: DefaultSession['user'] & {
      id: string
      accessToken: string
      name: string
      role: string
    }
  }
}

// Used in: jwt() callback's `token` param
// This is the encrypted cookie stored server-side between requests
declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    id: string
    accessToken: string
    name: string
    role: string
  }
}
