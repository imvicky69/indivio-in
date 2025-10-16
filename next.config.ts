import type { NextConfig } from 'next';
import withPWA from '@ducanh2912/next-pwa';

const nextConfig: NextConfig = {
	eslint: {
		ignoreDuringBuilds: true,
	},
	/* config options here */
};

export default withPWA({
	dest: 'public',
	disable: process.env.NODE_ENV === 'development',
	register: true,
	workboxOptions: {
		skipWaiting: true,
		runtimeCaching: [
			{
				urlPattern: /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
				handler: 'CacheFirst',
				options: {
					cacheName: 'google-fonts',
					expiration: {
						maxEntries: 4,
						maxAgeSeconds: 365 * 24 * 60 * 60, // 1 year
					},
				},
			},
			{
				urlPattern: /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
				handler: 'StaleWhileRevalidate',
				options: {
					cacheName: 'static-font-assets',
					expiration: {
						maxEntries: 4,
						maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
					},
				},
			},
			{
				urlPattern: /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
				handler: 'StaleWhileRevalidate',
				options: {
					cacheName: 'static-image-assets',
					expiration: {
						maxEntries: 64,
						maxAgeSeconds: 24 * 60 * 60, // 24 hours
					},
				},
			},
			{
				urlPattern: /\.(?:js)$/i,
				handler: 'StaleWhileRevalidate',
				options: {
					cacheName: 'static-js-assets',
					expiration: {
						maxEntries: 32,
						maxAgeSeconds: 24 * 60 * 60, // 24 hours
					},
				},
			},
			{
				urlPattern: /\.(?:css|less)$/i,
				handler: 'StaleWhileRevalidate',
				options: {
					cacheName: 'static-style-assets',
					expiration: {
						maxEntries: 32,
						maxAgeSeconds: 24 * 60 * 60, // 24 hours
					},
				},
			},
			{
				urlPattern: /\/api\/.*$/i,
				handler: 'NetworkFirst',
				options: {
					cacheName: 'apis',
					expiration: {
						maxEntries: 16,
						maxAgeSeconds: 24 * 60 * 60, // 24 hours
					},
					networkTimeoutSeconds: 10,
				},
			},
			{
				urlPattern: /.*/i,
				handler: 'NetworkFirst',
				options: {
					cacheName: 'others',
					expiration: {
						maxEntries: 32,
						maxAgeSeconds: 24 * 60 * 60, // 24 hours
					},
					networkTimeoutSeconds: 10,
				},
			},
		],
	},
})(nextConfig);
