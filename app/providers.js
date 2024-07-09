'use client'

import {NextUIProvider} from '@nextui-org/react'
import TanstackProvider from './components/providers/TanstackProvider';

export function Providers({children}) {
  return (
    <TanstackProvider>
        <NextUIProvider>
        {children}
        </NextUIProvider>
    </TanstackProvider>
  )
}