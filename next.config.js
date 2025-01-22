/** @type {import('next').NextConfig} */
// Remove or comment out the PWA import and configuration
// const withPWA = require('next-pwa')({
//   dest: 'public', // The directory where the service worker will be generated
//   register: true, // Automatically register the service worker
//   skipWaiting: true, // Skip waiting for the service worker to activate
// });

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '**', 
      },
    ],
  },
};

// Export the configuration without PWA settings
// module.exports = withPWA(nextConfig);
module.exports = nextConfig; // Just export the nextConfig