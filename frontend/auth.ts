import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'
import Credentials from 'next-auth/providers/credentials'

// AUTH FLOW USING next-auth/auth.js:
// Registration:
//   onSubmit → fetch /api/v1/auth/register (NestJS) → success
//     → signIn("credentials") → authorize() → fetch /auth/login (NestJS)
//       → returns { user, accessToken }
//         → jwt() stores in token → session() exposes to client
//           → router.push('/posts')

// Login:
//   onSubmit → signIn("credentials") → authorize() → fetch api/v1/auth/login (NestJS)
//     → returns { user, accessToken }
//       → jwt() stores in token → session() exposes to client
//         → router.push('/posts')

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub,
    Google,
    Credentials({
      // ** The name to display on the sign in form (e.g. 'Sign in with...')
      // ** For more details on Credentials Provider, visit https://next-auth.js.org/providers/credentials
      name: 'Credentials',
      type: 'credentials', // Has to be unique across different providers if you are using multiple of the same providers
      // ** If you don't use custom pages, e.g pages: { signIn: '/login' }, this option will provide a page with the relevant HTML input fields with labels, field type, placeholder etc.
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        /*
         * You need to provide your own logic here that takes the credentials submitted and returns either
         * an object representing a user or value that is false/null if the credentials are invalid.
         * For e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
         * You can also use the `req` object to obtain additional parameters (i.e. the request IP address)
         */
        try {
          const { name, email, password, confirmPassword, isRegistration } = credentials as {
            name: string
            email: string
            password: string
            confirmPassword: string
            isRegistration: boolean
          }

          let res
          if (isRegistration) {
            res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/register`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                confirmPassword: confirmPassword
              })
            })
          } else {
            res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/login`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                email: email,
                password: password
              })
            })
          }

          const data = await res.json() // parse to json

          // console.log('authorize data', data)

          if (!res.ok) {
            if (res.status === 401 || res.status === 400) {
              throw new Error(data.response.message || data.message || 'Something went wrong. Please try again.')
            }
            throw new Error('Something went wrong. Please try again.') // or return null if you want
          }

          const { response } = data // extracting response obj(i.e data) from backend json res(see response shape from postman)
          const { access_token, user } = response.data // extracting required data
          // you can choose to send the entire data object here so callbacks(jwt and session methods below) gets the unaltered data from backend

          // console.log('authorize method', response, access_token, user)

          return {
            ...user,
            accessToken: access_token
          }
        } catch (error: unknown) {
          console.log('authorize error', error)
          throw new Error('Something went wrong. Please try again.') // or return null if you want
        }
      }
    })
  ],
  session: {
    /* (optional)
     * Choose how you want to save the user session.
     * The default is `jwt`, an encrypted JWT (JWE) stored in the session cookie.
     * If you use an `adapter` however, NextAuth default it to `database` instead.
     * You can still force a JWT session by explicitly defining `jwt`.
     * When using `database`, the session cookie will only contain a `sessionToken` value,
     * which is used to look up the session in the database.
     * If you use a custom credentials provider, user accounts will not be persisted in a database by NextAuth.js (even if one is configured).
     * The option to use JSON Web Tokens for session tokens must be enabled to use a custom credentials provider.
     */
    strategy: 'jwt',

    // ** Seconds - How long until an idle session expires and is no longer valid
    maxAge: 30 * 24 * 60 * 60 // ** 30 days
  },
  // ** Please refer to https://next-auth.js.org/configuration/options#pages for more `pages` options
  // ** Used to override default pages that next-auth provides. Next-auth's default uses '/sign-in'.
  pages: {
    signIn: '/login'
  },
  callbacks: {
    /* While using `jwt` as a strategy, `jwt()` callback will be called before
     * the `session()` callback. So we have to add custom parameters in `token`
     * via `jwt()` callback to make them accessible in the `session()` callback.
     * If strategy: 'database', then this callback will not be called at all.
     */
    async jwt({ token, user, trigger, session }) {
      // console.log('reach jwt method', user)
      /* Trigger and session will be used when you use useSession() to update session data */

      // update session without login/register. "session" contains data that we sent via the update method
      if (trigger === 'update' && session?.user) {
        token.name = session.name
        token.role = session.role
      }

      // On first sign in, user object is available — persist what you need. "user" here is the data returned from "authorize" method above
      if (user) {
        /* IMPORTANT: DO NOT USE/PASS FORMATS TO token obj THAT next-auth DOESN'T SUPPORT (i.e token.user = user.user). IT WILL CAUSE MISMATCH AND HENCE, HYDRATION ISSUES CAUSING session TO BE null OR undefined
         * For adding custom parameters to user in session, we first need to add those parameters
         * in token which then will be available in the `session()` callback
         */
        token.id = user.id
        token.accessToken = user.accessToken
        token.name = user.name
        token.role = user.role
      }

      // console.log('before return jwt method', token)

      return token
    },
    // ** For strategy: 'jwt', "token" is the token data returned from jwt callback method above this method i.e session callback method.
    // You will need to set the session.user equal to client-side session.user otherwise you won't be able to access
    // this in client-side components using useSession() or getSession()
    // ** For strategy: 'database', this function will be ran first(not sure about jwt callback) and we will need to set the user like this
    // according to docs (see https://next-auth.js.org/getting-started/client and search "Assuming a strategy: "database" is used....")
    async session({ session, token }) {
      // console.log('reach session method', token)
      // Expose token data to the client session
      session.user.id = token.id
      session.user.accessToken = token.accessToken
      session.user.name = token.name
      session.user.role = token.role
      // console.log('before return session method', session)
      return session
    }
  }
})
