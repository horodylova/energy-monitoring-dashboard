import "@progress/kendo-theme-default/dist/all.css";
import "@progress/kendo-theme-utils/dist/all.css";
import "./globals.css"; // Импортируем globals.css после тем Kendo UI

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
 