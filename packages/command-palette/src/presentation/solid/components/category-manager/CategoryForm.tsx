import type { CategoryFormProps } from "./types";

export function CategoryForm(props: CategoryFormProps) {
	return (
		<div class="category-form">
			<h3 class="form-title">
				{props.isEditing ? "Edit Category" : "Create Category"}
			</h3>
			<div class="form-group">
				<label for="category-name" class="form-label">
					Name
				</label>
				<input
					id="category-name"
					type="text"
					value={props.name}
					onInput={(e) => props.onNameChange(e.currentTarget.value)}
					class="form-input"
					placeholder="Category name"
				/>
			</div>

			<div class="form-group">
				<label for="category-description" class="form-label">
					Description
				</label>
				<textarea
					id="category-description"
					value={props.description}
					onInput={(e) => props.onDescriptionChange(e.currentTarget.value)}
					class="form-textarea"
					placeholder="Category description"
					rows={2}
				/>
			</div>

			<div class="form-group">
				<label for="category-icon" class="form-label">
					Icon
				</label>
				<input
					id="category-icon"
					type="text"
					value={props.icon}
					onInput={(e) => props.onIconChange(e.currentTarget.value)}
					class="form-input"
					placeholder="📁"
				/>
			</div>

			<div class="form-group">
				<label for="category-color" class="form-label">
					Color
				</label>
				<input
					id="category-color"
					type="color"
					value={props.color}
					onChange={(e) => props.onColorChange(e.currentTarget.value)}
					class="form-color"
				/>
			</div>

			<div class="form-actions">
				<button
					class="action-button cancel"
					onClick={props.onCancel}
					type="button"
				>
					Cancel
				</button>
				<button class="action-button save" onClick={props.onSave} type="button">
					{props.isEditing ? "Update" : "Create"}
				</button>
			</div>
		</div>
	);
}
