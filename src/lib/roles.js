// lib/roles.js

export const ROLES = {
  SUPER_ADMIN: "super_admin",
  ADMIN: "admin",
  ACCOUNTANT: "accountant",
  VOLUNTEER: "volunteer",
  USER: "user",
};

// What each role is allowed to do (client-side UI check)
export const PERMISSIONS = {
  super_admin: {
    users: ["read", "create", "update", "delete"],
    donations: ["read", "create", "update", "delete"],
    expenses: ["read", "create", "update", "delete"],
    funds: ["read", "create", "update", "delete"],
    reports: ["read", "create", "update", "delete"],
    settings: ["read", "update"],
  },
  admin: {
    users: ["read"],
    donations: ["read", "create", "update", "delete"],
    expenses: ["read", "create", "update"],
    funds: ["read"],
    reports: ["read"],
    settings: ["read"],
  },
  accountant: {
    users: [],
    donations: ["read"],
    expenses: ["read", "create", "update"],
    funds: ["read"],
    reports: ["read"],
    settings: ["read"],
  },
  volunteer: {
    users: [],
    donations: ["read"],
    expenses: [],
    funds: [],
    reports: [],
    settings: ["read"],
  },
  user: {
    users: [],
    donations: [],
    expenses: [],
    funds: [],
    reports: [],
    settings: [],
  },
};

// Check if a role has a permission on a resource
export function can(role, resource, action) {
  if (!role) return false;
  const perms = PERMISSIONS[role];
  if (!perms) return false;
  const actions = perms[resource] || [];
  return actions.includes(action);
}

// Check if role is admin-level
export function isAdminRole(role) {
  return role === ROLES.SUPER_ADMIN || role === ROLES.ADMIN;
}

// Check if role is super admin
export function isSuperAdminRole(role) {
  return role === ROLES.SUPER_ADMIN;
}