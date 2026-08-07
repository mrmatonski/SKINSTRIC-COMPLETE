export const STORAGE_KEYS = {
  demographicData: "demographicData",
  demographicCorrections: "demographicCorrections",
  uploadedImage: "uploadedImage",
  userName: "userName",
  userLocation: "userLocation",
} as const;

export function setLocalItem(key: string, value: string): boolean {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (error) {
    console.warn(`Failed to store ${key} in localStorage:`, error);
    return false;
  }
}

export function getLocalItem(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}
