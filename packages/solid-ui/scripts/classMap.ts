// UnoCSS base classes for generated Solid UI components.
// This file is imported by packages/solid-ui/scripts/generate.ts.

const inputBase =
	"flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50";

const controlBase =
	"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50";

const surfaceBase = "rounded-lg border bg-card text-card-foreground shadow-sm";

export const componentConfig: Record<string, { base?: string; body?: string }> = {
	Button: {
		base: controlBase,
		body: `const variantClass =
  local.variant === 'secondary' ? 'bg-secondary text-secondary-foreground hover:bg-secondary/80' :
  local.variant === 'destructive' ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90' :
  local.variant === 'ghost' ? 'hover:bg-accent hover:text-accent-foreground' :
  local.variant === 'link' ? 'text-primary underline-offset-4 hover:underline' :
  'bg-primary text-primary-foreground hover:bg-primary/90'
const sizeClass =
  local.size === 'sm' ? 'h-8 px-3 text-xs' :
  local.size === 'lg' ? 'h-10 px-8' :
  local.size === 'icon' ? 'h-9 w-9' :
  'h-9 px-4 py-2'
const className = [base, variantClass, sizeClass, local.class || ''].filter(Boolean).join(' ')
return (
  <button type="button" class={className} {...rest}>
    {local.children}
  </button>
)`,
	},
	Input: { base: inputBase },
	Textarea: { base: `${inputBase} min-h-[60px]` },
	Select: { base: `${inputBase} cursor-pointer` },
	Checkbox: {
		base: "h-4 w-4 accent-primary cursor-pointer rounded border border-primary",
		body: `const className = [base, local.class || ''].filter(Boolean).join(' ')
return <input type="checkbox" class={className} {...rest} />`,
	},
	Radio: {
		base: "h-4 w-4 accent-primary cursor-pointer rounded-full border border-primary",
		body: `const className = [base, local.class || ''].filter(Boolean).join(' ')
return <input type="radio" class={className} {...rest} />`,
	},
	Switch: {
		base: `${controlBase} border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground`,
		body: `const stateClass = local.checked ? 'bg-primary text-primary-foreground' : ''
const className = [base, stateClass, local.class || ''].filter(Boolean).join(' ')
return <button type="button" role="switch" aria-checked={local.checked} class={className} {...rest}>{local.children}</button>`,
	},
	Label: {
		base: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
		body: `const className = [base, local.class || ''].filter(Boolean).join(' ')
return <label class={className} for={local.for} {...rest}>{local.children}</label>`,
	},
	Form: { base: "w-full" },
	FormField: {
		base: "grid gap-2",
		body: `const className = [base, local.class || ''].filter(Boolean).join(' ')
return (
  <div class={className} {...rest}>
    {local.label ? <span class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{local.label}</span> : null}
    {local.children}
    {local.error ? <span class="text-sm text-destructive" role="alert">{local.error}</span> : null}
  </div>
)`,
	},
	FileInput: {
		base: `${inputBase} file:mr-4`,
		body: `const className = [base, local.class || ''].filter(Boolean).join(' ')
return <input type="file" class={className} {...rest} />`,
	},
	Slider: {
		base: "w-full accent-primary cursor-pointer",
		body: `const className = [base, local.class || ''].filter(Boolean).join(' ')
return <input type="range" class={className} {...rest} />`,
	},
	DatePicker: {
		base: inputBase,
		body: `const className = [base, local.class || ''].filter(Boolean).join(' ')
return <input type="date" class={className} {...rest} />`,
	},
	Card: { base: surfaceBase },
	Box: { base: `${surfaceBase} p-4` },
	Flex: { base: "flex flex-wrap items-center gap-2" },
	Grid: { base: "grid gap-2" },
	Stack: { base: "flex flex-col gap-2" },
	Separator: { base: "w-full border-0 border-t border-border" },
	AspectRatio: { base: "relative w-full overflow-hidden rounded-md bg-muted" },
	Skeleton: { base: "h-4 w-full animate-pulse rounded-md bg-muted" },
	Spinner: { base: "h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" },
	Loading: { base: "h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" },
	Progress: { base: "w-full h-2 rounded-full bg-muted accent-primary" },
	Avatar: { base: "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-muted" },
	Badge: {
		base: "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
	},
	Breadcrumb: { base: "flex items-center gap-1 text-sm text-muted-foreground" },
	Tabs: { base: "w-full" },
	Pagination: { base: "flex items-center gap-1" },
	Steps: { base: "flex items-center gap-2" },
	Timeline: { base: "relative pl-4 border-l border-border" },
	Menubar: { base: "flex items-center gap-1 p-1 rounded-lg border bg-card" },
	NavigationMenu: { base: "w-full" },
	TreeView: { base: "list-none p-0 m-0 space-y-1" },
	Dialog: { base: `${surfaceBase} p-6` },
	Modal: { base: `${surfaceBase} p-6` },
	Sheet: { base: `${surfaceBase} p-6` },
	Drawer: { base: `${surfaceBase} p-6` },
	Tooltip: { base: "rounded-md border bg-surface px-3 py-1.5 text-sm text-foreground shadow-md" },
	Popover: { base: `${surfaceBase} p-4` },
	Toast: { base: `${surfaceBase} p-4` },
	Toaster: { base: "fixed bottom-4 right-4 z-toast flex flex-col gap-2" },
	Alert: { base: `${surfaceBase} p-4` },
	Command: { base: `${surfaceBase} p-1` },
	CommandPalette: { base: "fixed inset-0 z-modal flex items-start justify-center pt-[10vh] bg-black/50" },
	Notification: { base: `${surfaceBase} p-4` },
	Table: { base: "w-full caption-bottom text-sm" },
	DataTable: { base: `w-full ${surfaceBase}` },
	VirtualList: { base: "relative h-full w-full overflow-auto" },
	ScrollArea: { base: "relative h-full w-full overflow-auto rounded-md border" },
	Image: {
		base: "max-w-full h-auto rounded-md object-cover",
		body: `const className = [base, local.class || ''].filter(Boolean).join(' ')
return <img class={className} alt={local.alt} {...rest} />`,
	},
	Chart: { base: `w-full h-64 ${surfaceBase} p-4` },
	Calendar: { base: `${surfaceBase} p-4` },
	Transition: { base: "transition-all duration-300" },
	Collapsible: { base: `${surfaceBase} p-4` },
	Accordion: { base: "w-full" },
	DropdownMenu: { base: `${surfaceBase} p-1` },
	Toggle: {
		base: `${controlBase} border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground`,
		body: `const stateClass = local.pressed ? 'bg-primary text-primary-foreground' : ''
const className = [base, stateClass, local.class || ''].filter(Boolean).join(' ')
return <button type="button" aria-pressed={local.pressed} class={className} {...rest}>{local.children}</button>`,
	},
	ToggleGroup: { base: "flex items-center gap-1 rounded-lg border bg-card p-1" },
	Resizable: { base: "flex h-64 w-full gap-2" },
};
