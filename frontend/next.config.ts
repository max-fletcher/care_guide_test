import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost', // Replace with your image domain
        port: '3000', // Specify port
        pathname: '/uploads/**' // Allows all image paths under this domain
      }
    ],
    dangerouslyAllowLocalIP: true // disable after development
  }
}

export default nextConfig
