export const ADMIN_ROLES = {
  SUPER_ADMIN: "super_admin",
  ADMIN: "admin",
};

export const ADMIN_PERMISSIONS = {
  super_admin: {
    admins: ["read", "create", "update", "delete"],
    users: ["read", "create", "update", "delete"],
    donations: ["read", "create", "update", "delete"],
    expenses: ["read", "create", "update", "delete"],
    funds: ["read", "create", "update", "delete"],
    reports: ["read", "create", "update", "delete"],
    settings: ["read", "update"],
  },
  admin: {
    admins: [],
    users: ["read", "create", "update"],
    donations: ["read", "create", "update", "delete"],
    expenses: ["read", "create", "update"],
    funds: ["read"],
    reports: ["read"],
    settings: ["read"],
  },
};

export function canAdmin(role, resource, action) {
  if (!role) return false;
  const perms = ADMIN_PERMISSIONS[role];
  if (!perms) return false;
  return (perms[resource] || []).includes(action);
}

export function isSuperAdmin(role) {
  return role === ADMIN_ROLES.SUPER_ADMIN;
}

export function isAdminRole(role) {
  return role === ADMIN_ROLES.SUPER_ADMIN || role === ADMIN_ROLES.ADMIN;
}