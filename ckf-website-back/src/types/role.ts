export type PermissionItem = {
  key: string;
  label: string;
};

export type PermissionGroup = {
  label: string;
  items: PermissionItem[];
};

export type PermissionListResponse = {
  success: boolean;
  permissions: string[];
};

const toTitle = (value: string) =>
  value ? value.charAt(0).toUpperCase() + value.slice(1) : value;

export const toPermissionGroups = (permissions: string[] = []): PermissionGroup[] => {
  const groups = new Map<string, PermissionItem[]>();

  permissions.forEach((permission) => {
    if (!permission) return;

    const [moduleName, action] = permission.split(".");
    const groupLabel = toTitle(moduleName || "Other");
    const items = groups.get(groupLabel) || [];

    if (!items.some((item) => item.key === permission)) {
      items.push({
        key: permission,
        label: toTitle(action || permission),
      });
      groups.set(groupLabel, items);
    }
  });

  return Array.from(groups.entries()).map(([label, items]) => ({ label, items }));
};

export type Role = {
  _id?: string;
  id?: string;
  name: string;
  key: string;
  permissions: string[];
  isActive?: boolean;
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type RolePayload = {
  name: string;
  key?: string;
  permissions: string[];
  isActive?: boolean;
};

export type RoleListResponse = {
  success: boolean;
  roles: Role[];
};

export type RoleResponse = {
  success: boolean;
  message?: string;
  role: Role;
};

export type RoleStatusPayload = {
  isActive: boolean;
};
