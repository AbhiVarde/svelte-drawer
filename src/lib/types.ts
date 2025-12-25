export interface DrawerProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  direction?: "bottom" | "top" | "left" | "right";
  closeOnEscape?: boolean;
}

export interface DrawerContentProps {
  class?: string;
  trapFocus?: boolean;
}

export interface DrawerOverlayProps {
  class?: string;
}

export interface DrawerHandleProps {
  class?: string;
}

export type DrawerVariant =
  | "default"
  | "sheet"
  | "dialog"
  | "minimal"
  | "sidebar";

export interface DrawerVariantsProps {
  variant?: DrawerVariant;
  class?: string;
  trapFocus?: boolean;
}
