/** @type {import('next').NextConfig} */
const withVideos = require('next-videos')

const nextConfig = {
    images: {
        remotePatterns: [
        {
            protocol: 'https',
            hostname: 'utfs.io',
            port: '',
            pathname: '/**',
        },
        ],
    },
};

// Combine the configurations
module.exports = withVideos(nextConfig);