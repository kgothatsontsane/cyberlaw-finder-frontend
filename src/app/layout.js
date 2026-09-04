import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";

export const metadata = {
  title: "CyberLaw Finder — AI-Powered Cybercrime Law Search",
  description: "NLP-enhanced keyword searching for cybercrime laws across South Africa, USA, and Germany/EU.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-cyber-dark font-sans antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
