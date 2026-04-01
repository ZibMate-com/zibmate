// src/flags.ts
import { flag } from "@vercel/flags/next";
import { vercelAdapter } from "@flags-sdk/vercel";
export const showFindPG = flag<boolean>({
  key: "show_findpg",
  defaultValue: false,
  description: "Show the Find PG route",
  adapter: vercelAdapter(),
  // decide() { return this.defaultValue ?? false; },
});

export const showOwnerDashboard = flag<boolean>({
  key: "show_owner_dashboard",
  defaultValue: false,
  description: "Show the Owner Dashboard route",
  adapter: vercelAdapter(),
  // decide() { return this.defaultValue ?? false; },
});

export const showTenantDashboard = flag<boolean>({
  key: "show_tenant_dashboard",
  defaultValue: false,
  description: "Show the Tenant Dashboard route",
  adapter: vercelAdapter(),
  // decide() { return this.defaultValue ?? false; },
});
