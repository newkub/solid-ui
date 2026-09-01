import { createSignal, type JSX, Show, splitProps } from "solid-js";

export interface FileInputProps extends Omit<JSX.InputHTMLAttributes<HTMLInputElement>, "type" | "value" | "onChange"> {
	onChange?: (files: File[]) => void;
}

export function FileInput(props: FileInputProps) {
	const [local, rest] = splitProps(props, ["class", "onChange", "accept", "multiple", "disabled"]);
	const [files, setFiles] = createSignal<File[]>([]);

	const handleChange: JSX.EventHandler<HTMLInputElement, Event> = (e) => {
		const list = (e.currentTarget as HTMLInputElement).files;
		const next = list ? Array.from(list) : [];
		setFiles(next);
		local.onChange?.(next);
	};

	const inputBase =
		"flex h-9 w-full cursor-pointer rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:mr-4 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50";
	const inputClass = () => [inputBase, local.class || ""].filter(Boolean).join(" ");

	return (
		<div class="w-full space-y-1">
			<input
				type="file"
				accept={local.accept}
				multiple={local.multiple}
				disabled={local.disabled}
				onChange={handleChange}
				class={inputClass()}
				{...rest}
			/>
			<Show when={files().length > 0} fallback={<span class="text-xs text-muted-foreground">No file chosen</span>}>
				<span class="text-xs text-muted-foreground">
					{files()
						.map((file) => file.name)
						.join(", ")}
				</span>
			</Show>
		</div>
	);
}
