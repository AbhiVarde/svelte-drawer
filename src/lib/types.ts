export interface DrawerProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  direction?: "bottom" | "top" | "left" | "right";
}

export interface DrawerContentProps {
  class?: string;
}

export interface DrawerOverlayProps {
  class?: string;
}
