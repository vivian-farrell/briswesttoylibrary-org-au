import type { Metadata } from 'next'
import { RootPage, generatePageMetadata } from '@payloadcms/next/views'
import { importMap } from '../importMap'
import config from '@payload-config'

type Args = {
  params: Promise<{ segments: string[] }>
  searchParams: Promise<{ [key: string]: string | string[] }>
}

export const generateMetadata = async (args: Args): Promise<Metadata> =>
  generatePageMetadata({ config, params: args.params, searchParams: args.searchParams })

export default async function Page(args: Args) {
  return RootPage({ config, importMap, params: args.params, searchParams: args.searchParams })
}
