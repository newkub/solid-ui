import { For } from "solid-js";
import type { WorkflowCondition, WorkflowErrorHandling } from "#modules/command-palette/types";
import type { StepEditorProps } from "./types";

export function StepEditor(props: StepEditorProps) {
	return (
		<div class="step-editor">
			<h3 class="section-title">Edit Step {props.index + 1}</h3>
			<div class="form-group">
				<label for="step-command" class="form-label">
					Command
				</label>
				<select
					id="step-command"
					value={props.step.commandId ?? ""}
					onChange={(e) => props.onStepChange(props.index, "commandId", e.currentTarget.value)}
					class="form-select"
				>
					<option value="">Select a command</option>
					<For each={props.commands ?? []}>{(command) => <option value={command.id}>{command.label}</option>}</For>
				</select>
			</div>

			<div class="form-group">
				<label for="step-delay" class="form-label">
					Delay (ms)
				</label>
				<input
					id="step-delay"
					type="number"
					value={props.step.delay ?? 0}
					onChange={(e) => props.onStepChange(props.index, "delay", Number.parseInt(e.currentTarget.value, 10))}
					class="form-input"
					min="0"
				/>
			</div>

			<div class="form-group">
				<label for="step-condition" class="form-label">
					Condition
				</label>
				<select
					id="step-condition"
					value={props.step.condition?.type ?? "success"}
					onChange={(e) => {
						const condition: WorkflowCondition = {
							type: e.currentTarget.value as WorkflowCondition["type"],
						};
						props.onStepChange(props.index, "condition", condition);
					}}
					class="form-select"
				>
					<option value="success">On Success</option>
					<option value="failure">On Failure</option>
					<option value="always">Always</option>
					<option value="custom">Custom</option>
				</select>
			</div>

			<div class="form-group">
				<label for="step-error-handling" class="form-label">
					Error Handling
				</label>
				<select
					id="step-error-handling"
					value={props.step.onError?.type ?? "stop"}
					onChange={(e) => {
						const errorHandling: WorkflowErrorHandling = {
							type: e.currentTarget.value as WorkflowErrorHandling["type"],
						};
						props.onStepChange(props.index, "onError", errorHandling);
					}}
					class="form-select"
				>
					<option value="stop">Stop</option>
					<option value="continue">Continue</option>
					<option value="retry">Retry</option>
				</select>
			</div>
		</div>
	);
}
