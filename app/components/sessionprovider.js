"use client"

import { SessionProvider } from "next-auth/react";
import { Montserrat } from 'next/font/google';
const montserrat = Montserrat({ subsets: ['latin'] })


const Provider = ({children}) => {
  return (
    <pre className={montserrat.className}>
      <SessionProvider>
        {children}
      </SessionProvider>
    </pre>
  )
}

export default Provider;
