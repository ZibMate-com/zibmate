// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { showFindPG, showOwnerDashboard, showTenantDashboard } from '@/flags';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/findpg')) {
    const isEnabled = await showFindPG();
    if (!isEnabled) return NextResponse.redirect(new URL('/coming-soon', request.url));
  }


  if (pathname.startsWith('/owner-dashboard')) {
    const isEnabled = await showOwnerDashboard();
    if (!isEnabled) return NextResponse.redirect(new URL('/coming-soon', request.url));
  }

  if (pathname.startsWith('/tenent-dashboard')) {
    const isEnabled = await showTenantDashboard();
    if (!isEnabled) return NextResponse.redirect(new URL('/coming-soon', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/findpg/:path*', '/owner-dashboard/:path*', '/tenent-dashboard/:path*'],
};