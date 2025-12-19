<script lang="ts">
  import DrawerContent from "./DrawerContent.svelte";

  type Variant = "default" | "sheet" | "dialog" | "minimal" | "sidebar";

  let {
    variant = "default",
    class: className = "",
    children,
    ...restProps
  }: {
    variant?: Variant;
    class?: string;
    children?: any;
    [key: string]: any;
  } = $props();

  const variantStyles: Record<Variant, string> = {
    default:
      "bg-gray-100 flex flex-col rounded-t-[10px] mt-24 h-fit fixed bottom-0 left-0 right-0 outline-none",
    sheet:
      "bg-white flex flex-col rounded-t-3xl h-[85vh] fixed bottom-0 left-0 right-0 outline-none shadow-2xl",
    dialog:
      "bg-white flex flex-col rounded-lg h-fit max-h-[90vh] fixed inset-0 m-auto max-w-lg outline-none shadow-xl",
    minimal:
      "bg-white flex flex-col h-fit fixed bottom-0 left-0 right-0 outline-none",
    sidebar:
      "bg-white h-full w-full max-w-sm fixed top-0 bottom-0 outline-none shadow-2xl",
  };

  const combinedClass = $derived(
    `${variantStyles[variant]} ${className}`.trim()
  );
</script>

<DrawerContent class={combinedClass} {...restProps}>
  {@render children?.()}
</DrawerContent>
