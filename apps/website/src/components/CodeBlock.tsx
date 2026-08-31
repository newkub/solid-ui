import { CopyButton } from "./CopyButton";
import { ShikiCode } from "./ShikiCode";

export function CodeBlock(props: { code: string; language?: string }) {
	return (
		<div class="code-block">
			<CopyButton text={props.code} class="code-block__copy" />
			<ShikiCode code={props.code} lang={props.language ?? "tsx"} />
		</div>
	);
}
