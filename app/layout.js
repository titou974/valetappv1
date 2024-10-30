import './globals.css';
import { Montserrat } from 'next/font/google';
import { Providers } from './providers';

const montserrat = Montserrat({ subsets: ['latin'] });

export const metadata = {
  title: 'Nestor App',
  description: "L'assistant pour les voituriers",
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }) {
  return (
    <html lang='fr' data-theme='light'>
      <body className={montserrat.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
