import './globals.css';
import { Montserrat } from 'next/font/google';
import { Providers } from './providers';

const montserrat = Montserrat({ subsets: ['latin'] });

export const metadata = {
  title: 'Nestor App',
  description: "L'assistant pour les voituriers",
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
