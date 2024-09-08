import { NextResponse, NextRequest } from 'next/server'
import acceptLanguage from 'accept-language'
import { DEFAULT_LANGUAGE, languagesCollection, I18_COOKIE_NAME } from './i18n/settings'

acceptLanguage.languages(languagesCollection)

export const config = {
  // matcher: '/:lng*'
  matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|site.webmanifest).*)']
}

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.indexOf('icon') > -1 || req.nextUrl.pathname.indexOf('chrome') > -1) return NextResponse.next()
  let lng: string | undefined | null
  if (req.cookies.has(I18_COOKIE_NAME)) lng = acceptLanguage.get(req.cookies.get(I18_COOKIE_NAME)?.value)
  if (!lng) lng = acceptLanguage.get(req.headers.get('Accept-Language'))
  if (!lng) lng = DEFAULT_LANGUAGE

  // Redirect if lng in path is not supported
  if (
    !languagesCollection.some(loc => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
    !req.nextUrl.pathname.startsWith('/_next')
  ) {
    return NextResponse.redirect(new URL(`/${lng}${req.nextUrl.pathname}`, req.url))
  }

  if (req.headers.has('referer')) {
    const refererUrl = new URL(req.headers.get('referer') || '')
    const lngInReferer = languagesCollection.find((l) => refererUrl.pathname.startsWith(`/${l}`))
    const response = NextResponse.next()
    if (lngInReferer) response.cookies.set(I18_COOKIE_NAME, lngInReferer)
    return response
  }

  return NextResponse.next()
}