import './globals.css';
import { Montserrat } from 'next/font/google';
import TanstackProvider from './components/providers/TanstackProvider';

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata = {
  title: 'Nestor App',
  description: "L'assistant pour les voituriers",
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={montserrat.className}>
        <TanstackProvider>
          {children}
        </TanstackProvider>
      </body>
    </html>
  )
}
