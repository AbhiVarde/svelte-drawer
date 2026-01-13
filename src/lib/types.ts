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
  persistState?: boolean;
  persistKey?: string;
  persistSnapPoint?: boolean;
}

export interface DrawerContentProps {
  class?: string;
  trapFocus?: boolean;
}

export interface DrawerOverlayProps {
  class?: string;
  blur?: boolean | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
}

export interface DrawerHandleProps {
  class?: string;
}

export interface DrawerPortalProps {
  container?: HTMLElement | string;
}

export interface DrawerHeaderProps {
  title?: string;
  description?: string;
  showCloseButton?: boolean;
  onClose?: () => void;
  class?: string;
}

export interface DrawerFooterProps {
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
