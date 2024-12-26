import "./globals.css";

export const metadata = {
  title: "Library API",
  description: "Complete library management",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
