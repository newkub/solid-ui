/**
 * WorkflowExecutionViewer - SolidJS component for viewing workflow execution status
 */

import { createMemo, For, Show, splitProps } from "solid-js";
import type { WorkflowExecution } from "#modules/command-palette/types";
import { ExecutionCard } from "./workflow-execution-viewer/ExecutionCard";
import {
	formatDate,
	formatDuration,
	getExecutionProgress,
	getStatusColor,
} from "./workflow-execution-viewer/utils";

interface WorkflowExecutionViewerProps {
	executions: readonly WorkflowExecution[];
	onViewDetails?: (executionId: string) => void;
	onCancelExecution?: (executionId: string) => void;
	onRetryExecution?: (executionId: string) => void;
}

export function WorkflowExecutionViewer(props: WorkflowExecutionViewerProps) {
	const [local] = splitProps(props, [
		"executions",
		"onViewDetails",
		"onCancelExecution",
		"onRetryExecution",
	]);

	const runningExecutions = createMemo(() =>
		local.executions.filter((e) => e.status === "running"),
	);

	const completedExecutions = createMemo(() =>
		local.executions.filter((e) => e.status === "completed"),
	);

	const failedExecutions = createMemo(() =>
		local.executions.filter((e) => e.status === "failed"),
	);

	return (
		<div class="workflow-execution-viewer">
			<div class="execution-header">
				<h2 class="execution-title">Workflow Executions</h2>
				<div class="execution-stats">
					<div class="stat-item">
						<span class="stat-label">Running:</span>
						<span class="stat-value">{runningExecutions().length}</span>
					</div>
					<div class="stat-item">
						<span class="stat-label">Completed:</span>
						<span class="stat-value">{completedExecutions().length}</span>
					</div>
					<div class="stat-item">
						<span class="stat-label">Failed:</span>
						<span class="stat-value">{failedExecutions().length}</span>
					</div>
				</div>
			</div>

			<Show when={runningExecutions().length > 0}>
				<div class="execution-section">
					<h3 class="section-title">Running</h3>
					<div class="execution-list">
						<For each={runningExecutions()}>
							{(execution) => (
								<ExecutionCard
									execution={execution}
									statusColor={getStatusColor(execution.status)}
									formatDuration={formatDuration}
									formatDate={formatDate}
									getProgress={getExecutionProgress}
									onViewDetails={local.onViewDetails}
									onCancel={local.onCancelExecution}
								/>
							)}
						</For>
					</div>
				</div>
			</Show>

			<Show when={failedExecutions().length > 0}>
				<div class="execution-section">
					<h3 class="section-title">Failed</h3>
					<div class="execution-list">
						<For each={failedExecutions()}>
							{(execution) => (
								<ExecutionCard
									execution={execution}
									statusColor={getStatusColor(execution.status)}
									formatDuration={formatDuration}
									formatDate={formatDate}
									getProgress={getExecutionProgress}
									{...(local.onViewDetails
										? { onViewDetails: local.onViewDetails }
										: {})}
									{...(local.onRetryExecution
										? { onRetry: local.onRetryExecution }
										: {})}
								/>
							)}
						</For>
					</div>
				</div>
			</Show>

			<Show when={completedExecutions().length > 0}>
				<div class="execution-section">
					<h3 class="section-title">Completed</h3>
					<div class="execution-list">
						<For each={completedExecutions()}>
							{(execution) => (
								<ExecutionCard
									execution={execution}
									statusColor={getStatusColor(execution.status)}
									formatDuration={formatDuration}
									formatDate={formatDate}
									getProgress={getExecutionProgress}
									{...(local.onViewDetails
										? { onViewDetails: local.onViewDetails }
										: {})}
								/>
							)}
						</For>
					</div>
				</div>
			</Show>

			<Show when={local.executions.length === 0}>
				<div class="empty-state">
					<p class="empty-message">No workflow executions</p>
				</div>
			</Show>
		</div>
	);
}
