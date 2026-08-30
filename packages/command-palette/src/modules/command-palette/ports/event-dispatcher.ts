/**
 * Event Dispatcher Port - Interface for event handling
 * Defines contract for event dispatching operations
 */

import type { Result } from "#shared/types";
import type { CommandEvent } from "../domain/events/command-events";

export interface EventDispatcher {
	// Dispatch single event
	dispatch(event: CommandEvent): Promise<Result<void>>;

	// Dispatch multiple events
	dispatchBatch(events: readonly CommandEvent[]): Promise<Result<void>>;

	// Subscribe to events
	subscribe<T extends CommandEvent>(
		eventType: T["type"],
		handler: (event: T) => Promise<void>,
	): Promise<Result<string>>; // Returns subscription ID

	// Unsubscribe from events
	unsubscribe(subscriptionId: string): Promise<Result<void>>;

	// Get active subscriptions
	getActiveSubscriptions(): Promise<Result<readonly string[]>>;
}
