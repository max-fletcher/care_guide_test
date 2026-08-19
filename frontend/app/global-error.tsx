'use client' // Error boundaries must be Client Components

import NextError from 'next/error'
import { useEffect } from 'react'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <html>
      <body>
        {/* `NextError` is the default Next.js error page component. Its type
        definition requires a `statusCode` prop. However, since the App Router
        does not expose status codes for errors, we simply pass 0 to render a
        generic error message. */}
        <h2>Application Error</h2>
        <NextError statusCode={0} />

        {/* "reset" that comes from "Error" can be used to re-render the page, 
        which is useful if the issue is network related. You can design a custom component 
        for global error and use this button with this logic to re-render on clicking it. 
        */}
        <button onClick={() => reset()}> Try again </button>
      </body>
    </html>
  )
}
