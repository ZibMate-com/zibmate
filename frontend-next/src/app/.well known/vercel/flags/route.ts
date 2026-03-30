import { ApiData, verifyAccess } from '@vercel/flags';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const access = await verifyAccess(request.headers.get('Authorization'));
  if (!access) return NextResponse.json(null, { status: 401 });

  return NextResponse.json<ApiData>({
    definitions: {
      'show-findpg': {
        description: 'Show the Find PG route',
        defaultValue: false,
        options: [
          { value: false, label: 'Off' },
          { value: true, label: 'On' },
        ],
      },
      'show-owner-dashboard': {
        description: 'Show the Owner Dashboard route',
        defaultValue: false,
        options: [
          { value: false, label: 'Off' },
          { value: true, label: 'On' },
        ],
      },
      'show-tenant-dashboard': {
        description: 'Show the Tenant Dashboard route',
        defaultValue: false,
        options: [
          { value: false, label: 'Off' },
          { value: true, label: 'On' },
        ],
      },
    },
  });
}