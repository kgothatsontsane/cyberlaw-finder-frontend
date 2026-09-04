import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";

export const metadata = {
  title: "CyberLaw Finder — AI-Powered Cybercrime Law Search",
  description:
    "Describe an incident in plain language and find the cybercrime laws that apply — South Africa, USA, and Germany/EU. Semantic search over 96 statutes.",
  viewport: {
    width: "device-width",
    initialScale: 1,
    viewportFit: "cover",
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf9f6" },
    { media: "(prefers-color-scheme: dark)", color: "#0c0f15" },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-cyber-dark antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}