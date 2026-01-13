interface DrawerState {
  open: boolean;
  snapPoint?: number;
}

const STORAGE_PREFIX = "svelte-drawer-";

export function saveDrawerState(
  key: string,
  open: boolean,
  snapPoint?: number
): void {
  if (typeof window === "undefined") return;

  try {
    const state: DrawerState = { open };
    if (snapPoint !== undefined) {
      state.snapPoint = snapPoint;
    }

    localStorage.setItem(`${STORAGE_PREFIX}${key}`, JSON.stringify(state));
  } catch (error) {
    console.warn("Failed to save drawer state:", error);
  }
}

export function loadDrawerState(key: string): DrawerState | null {
  if (typeof window === "undefined") return null;

  try {
    const stored = localStorage.getItem(`${STORAGE_PREFIX}${key}`);
    if (!stored) return null;

    return JSON.parse(stored) as DrawerState;
  } catch (error) {
    console.warn("Failed to load drawer state:", error);
    return null;
  }
}

export function clearDrawerState(key: string): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.removeItem(`${STORAGE_PREFIX}${key}`);
  } catch (error) {
    console.warn("Failed to clear drawer state:", error);
  }
}
