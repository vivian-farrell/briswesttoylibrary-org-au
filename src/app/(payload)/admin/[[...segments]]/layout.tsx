import '@payloadcms/next/css'
import type { ServerFunctionClient } from 'payload'
import { RootLayout, handleServerFunctions } from '@payloadcms/next/layouts'
import config from '@payload-config'
import { importMap } from '../importMap'
import { ErudaDevTools } from '@/components/ErudaDevTools'

type Args = {
  children: React.ReactNode
}

const serverFunction: ServerFunctionClient = async function (args) {
  'use server'
  return handleServerFunctions({
    ...args,
    config,
    importMap,
  })
}

export { metadata } from '@payloadcms/next/layouts'

export default function Layout({ children }: Args) {
  return RootLayout({
    children: (
      <>
        {children}
        {process.env.NEXT_PUBLIC_DEVTOOLS === 'true' && <ErudaDevTools />}
      </>
    ),
    config,
    importMap,
    serverFunction,
  })
}
