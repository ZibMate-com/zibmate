// src/flags.ts
import { flag } from '@vercel/flags/next';

export const showFindPG = flag<boolean>({
  key: 'show-findpg',
  defaultValue: false,
  description: 'Show the Find PG route',
  decide() { return this.defaultValue ?? false; }, 
});

export const showOwnerDashboard = flag<boolean>({
  key: 'show-owner-dashboard',
  defaultValue: false,
  description: 'Show the Owner Dashboard route',
  decide() { return this.defaultValue ?? false; },
});

export const showTenantDashboard = flag<boolean>({
  key: 'show-tenant-dashboard',
  defaultValue: false,
  description: 'Show the Tenant Dashboard route',
  decide() { return this.defaultValue ?? false; },
});