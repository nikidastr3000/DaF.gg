import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DaF.gg - TestDaF Preparation Platform',
  description: 'AI-powered preparation for the TestDaF German exam.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className={`${inter.className} bg-gray-50 text-gray-900`}>
        <header className="bg-white shadow-sm py-4">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <h1 className="text-xl font-bold text-blue-600">DaF.gg</h1>
            <nav>
              {/* Navigation links will go here */}
            </nav>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8 min-h-screen">
          {children}
        </main>
        <footer className="bg-gray-800 text-white py-6 text-center">
          <p>&copy; {new Date().getFullYear()} DaF.gg. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
