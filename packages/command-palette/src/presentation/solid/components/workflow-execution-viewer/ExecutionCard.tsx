/**
 * ExecutionCard - Individual workflow execution card component
 */

import { For, Show, splitProps } from "solid-js";
import type { WorkflowExecution } from "#modules/command-palette/types";

interface ExecutionCardProps {
	execution: WorkflowExecution;
	statusColor: string;
	formatDuration: (ms: number) => string;
	formatDate: (date: Date) => string;
	getProgress: (execution: WorkflowExecution) => number;
	onViewDetails?: (executionId: string) => void;
	onCancel?: (executionId: string) => void;
	onRetry?: (executionId: string) => void;
}

export function ExecutionCard(props: ExecutionCardProps) {
	const [local] = splitProps(props, [
		"execution",
		"statusColor",
		"formatDuration",
		"formatDate",
		"getProgress",
		"onViewDetails",
		"onCancel",
		"onRetry",
	]);

	const executionDuration = () => {
		if (local.execution.completedAt) {
			return (
				local.execution.completedAt.getTime() -
				local.execution.startedAt.getTime()
			);
		}
		return Date.now() - local.execution.startedAt.getTime();
	};

	const progress = () => local.getProgress(local.execution);

	return (
		<div class="execution-card">
			<div class="execution-card-header">
				<div class="execution-info">
					<div class={`status-indicator ${local.statusColor}`} />
					<span class="execution-id">{local.execution.id}</span>
					<span class="execution-status">{local.execution.status}</span>
				</div>
				<div class="execution-actions">
					<button
						class="action-button view"
						onClick={() => local.onViewDetails?.(local.execution.id)}
						type="button"
					>
						View Details
					</button>
					<Show when={local.execution.status === "running"}>
						<button
							class="action-button cancel"
							onClick={() => local.onCancel?.(local.execution.id)}
							type="button"
						>
							Cancel
						</button>
					</Show>
					<Show when={local.execution.status === "failed"}>
						<button
							class="action-button retry"
							onClick={() => local.onRetry?.(local.execution.id)}
							type="button"
						>
							Retry
						</button>
					</Show>
				</div>
			</div>

			<div class="execution-progress">
				<div class="progress-bar">
					<div class="progress-fill" style={{ width: `${progress()}%` }} />
				</div>
				<span class="progress-text">
					Step {local.execution.currentStepIndex + 1} /{" "}
					{local.execution.results.length}
				</span>
			</div>

			<div class="execution-meta">
				<span class="meta-item">
					Started: {local.formatDate(local.execution.startedAt)}
				</span>
				<span class="meta-item">
					Duration: {local.formatDuration(executionDuration())}
				</span>
			</div>

			<Show when={local.execution.error}>
				<div class="execution-error">
					<span class="error-label">Error:</span>
					<span class="error-message">{local.execution.error}</span>
				</div>
			</Show>

			<div class="execution-steps-summary">
				<For each={local.execution.results}>
					{(result, index) => (
						<div class={`step-result ${result.success ? "success" : "failed"}`}>
							<span class="step-number">Step {index() + 1}</span>
							<span class="step-status">{result.success ? "✓" : "✗"}</span>
							<span class="step-duration">
								{local.formatDuration(result.executionTime)}
							</span>
						</div>
					)}
				</For>
			</div>
		</div>
	);
}
