# Basic Usage Example

## Install

```bash
bun add @wrikka/solid-ui
```

## Use a component

```tsx
import { Button } from "@wrikka/solid-ui";

export function App() {
	return <Button variant="primary" size="md">Click me</Button>;
}
```

## Use the command palette

```tsx
import { CommandPalette } from "@wrikka/command-palette";

export function App() {
	return <CommandPalette commands={[]} onSelect={(cmd) => console.log(cmd)} />;
}
```
