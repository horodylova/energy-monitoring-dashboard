/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [],
    formats: ['image/avif', 'image/webp'],
  },
  webpack(config, { isServer }) {
    // Handle SVG imports
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    });

    // Ensure proper module resolution for Kendo UI
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }

    return config;
  },
  transpilePackages: [
    '@progress/kendo-react-charts',
    '@progress/kendo-react-common',
    '@progress/kendo-react-buttons',
    '@progress/kendo-react-layout',
    '@progress/kendo-react-dateinputs',
    '@progress/kendo-react-indicators',
    '@progress/kendo-svg-icons'
  ],
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, no-cache, must-revalidate, proxy-revalidate',
          },
        ],
      },
    ];
  },
};

export default nextConfig;