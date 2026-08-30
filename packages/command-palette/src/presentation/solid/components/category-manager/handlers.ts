import type { CommandCategory } from "#modules/command-palette/types";

export function createCategoryHandlers(
	categories: readonly CommandCategory[] | undefined,
	editingCategory: CommandCategory | null,
	newCategoryName: string,
	newCategoryDescription: string,
	newCategoryIcon: string,
	newCategoryColor: string,
	setEditingCategory: (category: CommandCategory | null) => void,
	setNewCategoryName: (name: string) => void,
	setNewCategoryDescription: (description: string) => void,
	setNewCategoryIcon: (icon: string) => void,
	setNewCategoryColor: (color: string) => void,
	setIsCreating: (creating: boolean) => void,
	onCreateCategory?: (category: Omit<CommandCategory, "id">) => void,
	onUpdateCategory?: (
		categoryId: string,
		updates: Partial<CommandCategory>,
	) => void,
	onDeleteCategory?: (categoryId: string) => void,
) {
	const handleCreateCategory = () => {
		if (newCategoryName.trim()) {
			const categoryData: Omit<CommandCategory, "id"> = {
				name: newCategoryName,
				color: newCategoryColor,
				order: categories?.length ?? 0,
			};

			if (newCategoryDescription) {
				(
					categoryData as CommandCategory & { description: string }
				).description = newCategoryDescription;
			}
			if (newCategoryIcon) {
				(categoryData as CommandCategory & { icon: string }).icon =
					newCategoryIcon;
			}

			onCreateCategory?.(categoryData);
			setNewCategoryName("");
			setNewCategoryDescription("");
			setNewCategoryIcon("");
			setNewCategoryColor("#3b82f6");
			setIsCreating(false);
		}
	};

	const handleUpdateCategory = () => {
		if (editingCategory) {
			const updates: Partial<CommandCategory> = {
				name: newCategoryName,
				color: newCategoryColor,
			};

			if (newCategoryDescription) {
				(updates as CommandCategory & { description: string }).description =
					newCategoryDescription;
			}
			if (newCategoryIcon) {
				(updates as CommandCategory & { icon: string }).icon = newCategoryIcon;
			}

			onUpdateCategory?.(editingCategory.id, updates);
			setEditingCategory(null);
			setNewCategoryName("");
			setNewCategoryDescription("");
			setNewCategoryIcon("");
			setNewCategoryColor("#3b82f6");
		}
	};

	const handleDeleteCategory = (categoryId: string) => {
		onDeleteCategory?.(categoryId);
	};

	const handleEditCategory = (category: CommandCategory) => {
		setEditingCategory(category);
		setNewCategoryName(category.name);
		setNewCategoryDescription(category.description ?? "");
		setNewCategoryIcon(category.icon ?? "");
		setNewCategoryColor(category.color ?? "#3b82f6");
	};

	const handleCancelEdit = () => {
		setEditingCategory(null);
		setIsCreating(false);
		setNewCategoryName("");
		setNewCategoryDescription("");
		setNewCategoryIcon("");
		setNewCategoryColor("#3b82f6");
	};

	return {
		handleCreateCategory,
		handleUpdateCategory,
		handleDeleteCategory,
		handleEditCategory,
		handleCancelEdit,
	};
}
