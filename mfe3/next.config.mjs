// remote/next.config.js
import { NextFederationPlugin } from '@module-federation/nextjs-mf';

const nextConfig = {
  reactStrictMode: true,
  webpack(config, { isServer }) {
    config.plugins.push(
      new NextFederationPlugin({
        name: 'remote',
        filename: 'static/chunks/remoteEntry.js',
        exposes: {
          // specify exposed pages and components
          './Home': './src/pages/index.tsx',
          './SomeComponent': './src/components/SomeComponent.tsx'  
        },
        shared: {
          // specify shared dependencies 
          // read more in Shared Dependencies section
        },
      })
    );

    return config;
  },
}


export default nextConfig;
