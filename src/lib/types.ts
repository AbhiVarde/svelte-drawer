export interface DrawerProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  direction?: "bottom" | "top" | "left" | "right";
  closeOnEscape?: boolean;
  snapPoints?: number[];
  activeSnapPoint?: number;
  onSnapPointChange?: (snapPoint: number) => void;
  portal?: boolean;
  portalContainer?: HTMLElement | string;
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

export interface DrawerPortalProps {
  container?: HTMLElement | string;
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
