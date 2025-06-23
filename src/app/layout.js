import "@progress/kendo-theme-default/dist/all.css";
import "@progress/kendo-theme-utils/dist/all.css";
import "./globals.css";

export const metadata = {
  title: 'Energy Monitoring Dashboard',
  description: 'Real-time energy monitoring and analytics dashboard',
  icons: {
    icon: [
      {
        url: '/favicon.svg',
        type: 'image/svg+xml',
      },
      {
        url: '/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        url: '/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      }
    ],
    apple: {
      url: '/apple-touch-icon.png',
      sizes: '180x180',
      type: 'image/png',
    },
  },
  themeColor: '#1f2937',
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}