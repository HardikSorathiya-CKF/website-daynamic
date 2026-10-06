import type { User } from "../types/auth";

const TOKEN_KEY = "token";
const USER_KEY = "user";

export const saveToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const saveUser = (user: User) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getUser = (): User | null => {
  const data = localStorage.getItem(USER_KEY);
  if (!data) return null;

  try {
    return JSON.parse(data) as User;
  } catch {
    return null;
  }
};

export const clearAuth = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

/* Example: superadmin -> Superadmin Panel */
export const getRolePanelLabel = (role?: string) => {
  if (!role) return "Panel";
  const name = role.charAt(0).toUpperCase() + role.slice(1);
  return `${name} Panel`;
};

export const getUserAvatar = (user?: User | null) => {
  if (user?.avatar) return user.avatar;
  const name = user?.name || "Admin";
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=062d67&color=fff`;
};
