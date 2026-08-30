/**
 * SnippetLibrary - SolidJS component for command palette snippet library
 */

import { createMemo, createSignal, For, Show, splitProps } from "solid-js";
import type { Snippet } from "#modules/command-palette/types";
import { CreateSnippetForm, EditSnippetForm } from "./SnippetLibraryForms";

interface SnippetLibraryProps {
	snippets: readonly Snippet[];
	onCreateSnippet?: (
		snippet: Omit<Snippet, "id" | "createdAt" | "updatedAt">,
	) => void;
	onEditSnippet?: (snippet: Snippet) => void;
	onDeleteSnippet?: (snippetId: string) => void;
	onSearchSnippets?: (query: string) => void;
}

export function SnippetLibrary(props: SnippetLibraryProps) {
	const [local] = splitProps(props, [
		"snippets",
		"onCreateSnippet",
		"onEditSnippet",
		"onDeleteSnippet",
		"onSearchSnippets",
	]);

	const [searchQuery, setSearchQuery] = createSignal("");
	const [selectedCategory, setSelectedCategory] = createSignal<string>("all");
	const [isCreating, setIsCreating] = createSignal(false);
	const [editingSnippet, setEditingSnippet] = createSignal<Snippet | null>(
		null,
	);

	const filteredSnippets = createMemo(() => {
		return local.snippets.filter((snippet) => {
			const matchesSearch =
				!searchQuery() ||
				snippet.name.toLowerCase().includes(searchQuery().toLowerCase()) ||
				snippet.content.toLowerCase().includes(searchQuery().toLowerCase()) ||
				snippet.keywords?.some((k) =>
					k.toLowerCase().includes(searchQuery().toLowerCase()),
				);

			const matchesCategory =
				selectedCategory() === "all" || snippet.category === selectedCategory();

			return matchesSearch && matchesCategory;
		});
	});

	const categories = createMemo(() => {
		const cats = new Set(local.snippets.map((s) => s.category).filter(Boolean));
		return Array.from(cats);
	});

	const handleCreateSnippet = (
		snippet: Omit<Snippet, "id" | "createdAt" | "updatedAt">,
	) => {
		local.onCreateSnippet?.(snippet);
		setIsCreating(false);
	};

	const handleEditSnippet = (snippet: Snippet) => {
		local.onEditSnippet?.(snippet);
		setEditingSnippet(null);
	};

	const handleDeleteSnippet = (snippetId: string) => {
		local.onDeleteSnippet?.(snippetId);
	};

	return (
		<div class="snippet-library">
			<div class="snippet-header">
				<h2 class="snippet-title">Snippet Library</h2>
				<button
					class="create-button"
					onClick={() => setIsCreating(true)}
					type="button"
				>
					+ New Snippet
				</button>
			</div>

			<div class="snippet-controls">
				<input
					type="text"
					value={searchQuery()}
					onInput={(e) => setSearchQuery(e.currentTarget.value)}
					placeholder="Search snippets..."
					class="search-input"
				/>
				<select
					value={selectedCategory()}
					onChange={(e) => setSelectedCategory(e.currentTarget.value)}
					class="category-select"
				>
					<option value="all">All Categories</option>
					<For each={categories()}>
						{(category) => <option value={category}>{category}</option>}
					</For>
				</select>
			</div>

			<div class="snippet-list">
				<For each={filteredSnippets()}>
					{(snippet) => (
						<div class="snippet-card">
							<div class="snippet-header">
								<h3 class="snippet-name">{snippet.name}</h3>
								<Show when={snippet.category}>
									<span class="snippet-category">{snippet.category}</span>
								</Show>
								<Show when={snippet.language}>
									<span class="snippet-language">{snippet.language}</span>
								</Show>
							</div>

							<Show when={snippet.description}>
								<p class="snippet-description">{snippet.description}</p>
							</Show>

							<div class="snippet-content">
								<pre>
									<code>{snippet.content}</code>
								</pre>
							</div>

							<Show when={snippet.keywords && snippet.keywords.length > 0}>
								<div class="snippet-keywords">
									<For each={snippet.keywords}>
										{(keyword) => <span class="keyword-tag">{keyword}</span>}
									</For>
								</div>
							</Show>

							<div class="snippet-actions">
								<button
									class="action-button edit"
									onClick={() => setEditingSnippet(snippet)}
									type="button"
								>
									Edit
								</button>
								<button
									class="action-button delete"
									onClick={() => handleDeleteSnippet(snippet.id)}
									type="button"
								>
									Delete
								</button>
							</div>
						</div>
					)}
				</For>
				<Show when={filteredSnippets().length === 0}>
					<div class="empty-state">
						{local.snippets.length === 0
							? "No snippets yet. Create your first snippet!"
							: "No snippets match the current filters"}
					</div>
				</Show>
			</div>

			<Show when={isCreating()}>
				<div class="snippet-modal">
					<h3 class="modal-title">Create New Snippet</h3>
					<CreateSnippetForm
						onSubmit={handleCreateSnippet}
						onCancel={() => setIsCreating(false)}
					/>
				</div>
			</Show>

			<Show when={editingSnippet()}>
				<div class="snippet-modal">
					<h3 class="modal-title">Edit Snippet</h3>
					<EditSnippetForm
						snippet={editingSnippet()!}
						onSubmit={handleEditSnippet}
						onCancel={() => setEditingSnippet(null)}
					/>
				</div>
			</Show>
		</div>
	);
}
