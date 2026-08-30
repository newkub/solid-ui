/**
 * WorkflowEditor - SolidJS component for creating and editing workflows
 */

import { createMemo, createSignal, Show, splitProps } from "solid-js";
import type { WorkflowStep } from "#modules/command-palette/types";
import {
	createSaveHandler,
	createStepHandlers,
	createTriggerHandlers,
} from "./workflow-editor/handlers";
import { StepEditor } from "./workflow-editor/StepEditor";
import { StepsSection } from "./workflow-editor/StepsSection";
import { TriggersSection } from "./workflow-editor/TriggersSection";
import type { WorkflowEditorProps } from "./workflow-editor/types";
import { WorkflowForm } from "./workflow-editor/WorkflowForm";

export function WorkflowEditor(props: WorkflowEditorProps) {
	const [local] = splitProps(props, [
		"workflow",
		"onSave",
		"onCancel",
		"commands",
	]);

	const [name, setName] = createSignal(local.workflow?.name ?? "");
	const [description, setDescription] = createSignal(
		local.workflow?.description ?? "",
	);
	const [enabled, setEnabled] = createSignal(local.workflow?.enabled ?? true);
	const [steps, setSteps] = createSignal<WorkflowStep[]>([
		...(local.workflow?.steps ?? []),
	]);
	const [triggers, setTriggers] = createSignal([
		...(local.workflow?.triggers ?? []),
	]);
	const [selectedStepIndex, setSelectedStepIndex] = createSignal<number | null>(
		null,
	);

	const { handleAddStep, handleRemoveStep, handleStepChange } =
		createStepHandlers(
			steps(),
			setSteps,
			selectedStepIndex(),
			setSelectedStepIndex,
		);

	const { handleAddTrigger, handleRemoveTrigger, handleTriggerChange } =
		createTriggerHandlers(triggers(), setTriggers);

	const handleSave = createSaveHandler(
		local.workflow,
		name(),
		description(),
		enabled(),
		steps(),
		triggers(),
		local.onSave,
	);

	const selectedStep = createMemo(() => {
		const index = selectedStepIndex();
		return index !== null ? steps()[index] : null;
	});

	return (
		<div class="workflow-editor">
			<div class="workflow-header">
				<h2 class="workflow-title">
					{local.workflow ? "Edit Workflow" : "Create Workflow"}
				</h2>
				<div class="workflow-actions">
					<button
						class="action-button cancel"
						onClick={local.onCancel}
						type="button"
					>
						Cancel
					</button>
					<button class="action-button save" onClick={handleSave} type="button">
						Save
					</button>
				</div>
			</div>

			<WorkflowForm
				name={name()}
				description={description()}
				enabled={enabled()}
				onNameChange={setName}
				onDescriptionChange={setDescription}
				onEnabledChange={setEnabled}
			/>

			<TriggersSection
				triggers={triggers()}
				onAddTrigger={handleAddTrigger}
				onRemoveTrigger={handleRemoveTrigger}
				onTriggerChange={handleTriggerChange}
			/>

			<StepsSection
				steps={steps()}
				selectedStepIndex={selectedStepIndex()}
				commands={local.commands}
				onAddStep={handleAddStep}
				onRemoveStep={handleRemoveStep}
				onSelectStep={setSelectedStepIndex}
			/>

			<Show when={selectedStep()} keyed>
				{(step) => (
					<StepEditor
						step={step}
						index={selectedStepIndex() ?? 0}
						commands={local.commands}
						onStepChange={handleStepChange}
					/>
				)}
			</Show>
		</div>
	);
}

export type { WorkflowEditorProps };
