import { createSignal } from "solid-js";
import type { Snippet } from "#modules/command-palette/types";

interface CreateSnippetFormProps {
	onSubmit: (snippet: Omit<Snippet, "id" | "createdAt" | "updatedAt">) => void;
	onCancel: () => void;
}

export function CreateSnippetForm(props: CreateSnippetFormProps) {
	const [name, setName] = createSignal("");
	const [content, setContent] = createSignal("");
	const [description, setDescription] = createSignal("");
	const [category, setCategory] = createSignal("");
	const [language, setLanguage] = createSignal("");
	const [keywords, setKeywords] = createSignal("");

	const handleSubmit = (e: Event) => {
		e.preventDefault();
		const descriptionValue = description();
		const categoryValue = category();
		const languageValue = language();
		const keywordsValue = keywords();

		props.onSubmit({
			name: name(),
			content: content(),
			...(descriptionValue ? { description: descriptionValue } : {}),
			...(categoryValue ? { category: categoryValue } : {}),
			...(languageValue ? { language: languageValue } : {}),
			...(keywordsValue
				? {
						keywords: keywordsValue
							.split(",")
							.map((k) => k.trim())
							.filter(Boolean),
					}
				: {}),
		});
	};

	return (
		<form onSubmit={handleSubmit} class="snippet-form">
			<div class="form-group">
				<label for="create-snippet-name">Name *</label>
				<input
					id="create-snippet-name"
					type="text"
					value={name()}
					onInput={(e) => setName(e.currentTarget.value)}
					required
				/>
			</div>
			<div class="form-group">
				<label for="create-snippet-content">Content *</label>
				<textarea
					id="create-snippet-content"
					value={content()}
					onInput={(e) => setContent(e.currentTarget.value)}
					required
					rows={6}
				/>
			</div>
			<div class="form-group">
				<label for="create-snippet-description">Description</label>
				<input
					id="create-snippet-description"
					type="text"
					value={description()}
					onInput={(e) => setDescription(e.currentTarget.value)}
				/>
			</div>
			<div class="form-group">
				<label for="create-snippet-category">Category</label>
				<input
					id="create-snippet-category"
					type="text"
					value={category()}
					onInput={(e) => setCategory(e.currentTarget.value)}
				/>
			</div>
			<div class="form-group">
				<label for="create-snippet-language">Language</label>
				<input
					id="create-snippet-language"
					type="text"
					value={language()}
					onInput={(e) => setLanguage(e.currentTarget.value)}
				/>
			</div>
			<div class="form-group">
				<label for="create-snippet-keywords">Keywords (comma-separated)</label>
				<input
					id="create-snippet-keywords"
					type="text"
					value={keywords()}
					onInput={(e) => setKeywords(e.currentTarget.value)}
				/>
			</div>
			<div class="form-actions">
				<button type="submit" class="submit-button">
					Create Snippet
				</button>
				<button type="button" class="cancel-button" onClick={props.onCancel}>
					Cancel
				</button>
			</div>
		</form>
	);
}

interface EditSnippetFormProps {
	snippet: Snippet;
	onSubmit: (snippet: Snippet) => void;
	onCancel: () => void;
}

export function EditSnippetForm(props: EditSnippetFormProps) {
	const [name, setName] = createSignal(props.snippet.name);
	const [content, setContent] = createSignal(props.snippet.content);
	const [description, setDescription] = createSignal(
		props.snippet.description || "",
	);
	const [category, setCategory] = createSignal(props.snippet.category || "");
	const [language, setLanguage] = createSignal(props.snippet.language || "");
	const [keywords, setKeywords] = createSignal(
		props.snippet.keywords?.join(", ") || "",
	);

	const handleSubmit = (e: Event) => {
		e.preventDefault();
		const descriptionValue = description();
		const categoryValue = category();
		const languageValue = language();
		const keywordsValue = keywords();

		props.onSubmit({
			...props.snippet,
			name: name(),
			content: content(),
			...(descriptionValue ? { description: descriptionValue } : {}),
			...(categoryValue ? { category: categoryValue } : {}),
			...(languageValue ? { language: languageValue } : {}),
			...(keywordsValue
				? {
						keywords: keywordsValue
							.split(",")
							.map((k) => k.trim())
							.filter(Boolean),
					}
				: {}),
			updatedAt: new Date(),
		});
	};

	return (
		<form onSubmit={handleSubmit} class="snippet-form">
			<div class="form-group">
				<label for="edit-snippet-name">Name *</label>
				<input
					id="edit-snippet-name"
					type="text"
					value={name()}
					onInput={(e) => setName(e.currentTarget.value)}
					required
				/>
			</div>
			<div class="form-group">
				<label for="edit-snippet-content">Content *</label>
				<textarea
					id="edit-snippet-content"
					value={content()}
					onInput={(e) => setContent(e.currentTarget.value)}
					required
					rows={6}
				/>
			</div>
			<div class="form-group">
				<label for="edit-snippet-description">Description</label>
				<input
					id="edit-snippet-description"
					type="text"
					value={description()}
					onInput={(e) => setDescription(e.currentTarget.value)}
				/>
			</div>
			<div class="form-group">
				<label for="edit-snippet-category">Category</label>
				<input
					id="edit-snippet-category"
					type="text"
					value={category()}
					onInput={(e) => setCategory(e.currentTarget.value)}
				/>
			</div>
			<div class="form-group">
				<label for="edit-snippet-language">Language</label>
				<input
					id="edit-snippet-language"
					type="text"
					value={language()}
					onInput={(e) => setLanguage(e.currentTarget.value)}
				/>
			</div>
			<div class="form-group">
				<label for="edit-snippet-keywords">Keywords (comma-separated)</label>
				<input
					id="edit-snippet-keywords"
					type="text"
					value={keywords()}
					onInput={(e) => setKeywords(e.currentTarget.value)}
				/>
			</div>
			<div class="form-actions">
				<button type="submit" class="submit-button">
					Update Snippet
				</button>
				<button type="button" class="cancel-button" onClick={props.onCancel}>
					Cancel
				</button>
			</div>
		</form>
	);
}
