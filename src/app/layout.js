import "./globals.css";

export const metadata = {
  title: "Show Tracker",
  description: "A simple tracker for the shows you watch.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
