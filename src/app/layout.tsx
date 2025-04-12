import type { Metadata } from "next";
import { UserProvider } from './contexts/UserContext';
import { Fredoka } from 'next/font/google'
import "./globals.css";

const fredoka = Fredoka({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-fredoka',
})

export const metadata: Metadata = {
  title: "GlobeTrotter Game",
  description: "Game to test the geography knowledge!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fredoka.variable} antialiased`}
      >
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
