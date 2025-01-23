/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export', // Use this if you're statically exporting the app.
  images: {
    loader: 'default', // Ensures next/image uses the default loader
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com', // Add your specific hostname
        pathname: '**',
      },
    ],
    unoptimized: true, // Disables built-in optimization for static export
  },
};

module.exports = nextConfig;
