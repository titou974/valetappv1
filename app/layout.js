import './globals.css';
import { Montserrat } from 'next/font/google';
import Provider from './components/sessionprovider';

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata = {
  title: 'Nestor App',
  description: "L'assistant pour les voituriers",
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={montserrat.className}>
        {children}
      </body>
    </html>
  )
}
