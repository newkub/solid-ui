/**
 * CategoryManager - SolidJS component for managing command categories
 */

import { createMemo, createSignal, For, Show, splitProps } from "solid-js";
import type { CommandCategory } from "#modules/command-palette/types";
import { CategoryCard } from "./category-manager/CategoryCard";
import { CategoryForm } from "./category-manager/CategoryForm";
import { createCategoryHandlers } from "./category-manager/handlers";
import type { CategoryManagerProps } from "./category-manager/types";
import { getCategoryCommandCount } from "./category-manager/utils";

export function CategoryManager(props: CategoryManagerProps) {
	const [local] = splitProps(props, [
		"categories",
		"categoryGroups",
		"onCreateCategory",
		"onUpdateCategory",
		"onDeleteCategory",
		"onReorderCategories",
		"commands",
	]);

	const [isCreating, setIsCreating] = createSignal(false);
	const [editingCategory, setEditingCategory] =
		createSignal<CommandCategory | null>(null);
	const [newCategoryName, setNewCategoryName] = createSignal("");
	const [newCategoryDescription, setNewCategoryDescription] = createSignal("");
	const [newCategoryIcon, setNewCategoryIcon] = createSignal("");
	const [newCategoryColor, setNewCategoryColor] = createSignal("#3b82f6");

	const sortedCategories = createMemo(() => {
		return [...(local.categories ?? [])].sort((a, b) => a.order - b.order);
	});

	const {
		handleCreateCategory,
		handleUpdateCategory,
		handleDeleteCategory,
		handleEditCategory,
		handleCancelEdit,
	} = createCategoryHandlers(
		local.categories,
		editingCategory(),
		newCategoryName(),
		newCategoryDescription(),
		newCategoryIcon(),
		newCategoryColor(),
		setEditingCategory,
		setNewCategoryName,
		setNewCategoryDescription,
		setNewCategoryIcon,
		setNewCategoryColor,
		setIsCreating,
		local.onCreateCategory,
		local.onUpdateCategory,
		local.onDeleteCategory,
	);

	return (
		<div class="category-manager">
			<div class="manager-header">
				<h2 class="manager-title">Categories</h2>
				<button
					class="action-button create"
					onClick={() => setIsCreating(true)}
					type="button"
				>
					Create Category
				</button>
			</div>

			<Show when={isCreating() || editingCategory()}>
				<CategoryForm
					isEditing={!!editingCategory()}
					name={newCategoryName()}
					description={newCategoryDescription()}
					icon={newCategoryIcon()}
					color={newCategoryColor()}
					onNameChange={setNewCategoryName}
					onDescriptionChange={setNewCategoryDescription}
					onIconChange={setNewCategoryIcon}
					onColorChange={setNewCategoryColor}
					onCancel={handleCancelEdit}
					onSave={
						editingCategory() ? handleUpdateCategory : handleCreateCategory
					}
				/>
			</Show>

			<div class="categories-list">
				<For each={sortedCategories()}>
					{(category) => (
						<CategoryCard
							category={category}
							commandCount={getCategoryCommandCount(
								category.id,
								local.categoryGroups,
							)}
							onEdit={handleEditCategory}
							onDelete={handleDeleteCategory}
						/>
					)}
				</For>

				<Show when={!local.categories || local.categories.length === 0}>
					<div class="empty-state">
						<p class="empty-message">No categories</p>
					</div>
				</Show>
			</div>
		</div>
	);
}

export type { CategoryManagerProps };
