import { For } from "solid-js";
import { removeToast, toasts } from "../stores/toast";
import { Toast } from "./Toast";

export interface ToasterProps {
	class?: string;
}

export function Toaster(props: ToasterProps) {
	return (
		<div class={`fixed bottom-4 right-4 z-toast flex flex-col gap-2 ${props.class ?? ""}`}>
			<For each={toasts()}>
				{(item) => (
					<Toast
						title={item.title}
						description={item.description}
						variant={item.variant}
						onClose={() => removeToast(item.id)}
					/>
				)}
			</For>
		</div>
	);
}
