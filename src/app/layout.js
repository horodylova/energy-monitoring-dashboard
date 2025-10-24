import "./globals.css";

export const metadata = {
  title: 'Energy Monitoring Dashboard',
  description: 'Real-time energy monitoring and analytics dashboard',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1f2937',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}