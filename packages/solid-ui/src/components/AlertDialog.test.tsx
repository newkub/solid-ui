import { cleanup, fireEvent, render, screen } from "@solidjs/testing-library";
import { createSignal } from "solid-js";
import { afterEach, describe, expect, it, vi } from "vitest";
import { AlertDialog } from "./AlertDialog";

describe("AlertDialog", () => {
	afterEach(cleanup);

	it("renders the dialog and its content when open", () => {
		const [open, setOpen] = createSignal(true);
		render(() => (
			<AlertDialog
				open={open()}
				onOpenChange={setOpen}
				title="Confirm"
				description="Are you sure?"
				confirmLabel="Yes"
				cancelLabel="No"
			>
				This action cannot be undone.
			</AlertDialog>
		));

		const dialog = screen.getByRole("alertdialog");
		expect(dialog.tagName).toBe("DIV");
		expect(screen.getByText("Confirm")).toBeTruthy();
		expect(screen.getByText("Are you sure?")).toBeTruthy();
		expect(screen.getByText("This action cannot be undone.")).toBeTruthy();
		expect(screen.getByRole("button", { name: "Yes" })).toBeTruthy();
		expect(screen.getByRole("button", { name: "No" })).toBeTruthy();
	});

	it("does not render when closed", () => {
		render(() => <AlertDialog open={false} title="Confirm" />);
		expect(screen.queryByRole("alertdialog")).toBeNull();
	});

	it("applies a custom class to the dialog panel", () => {
		render(() => <AlertDialog open title="Confirm" class="custom-alert" />);
		const dialog = screen.getByRole("alertdialog");
		expect(dialog.classList.contains("custom-alert")).toBe(true);
		expect(dialog.classList.contains("bg-surface")).toBe(true);
	});

	it("calls onConfirm and onOpenChange when the confirm button is clicked", () => {
		const onConfirm = vi.fn();
		const onOpenChange = vi.fn();
		render(() => (
			<AlertDialog
				open
				title="Confirm"
				confirmLabel="Yes"
				cancelLabel="No"
				onConfirm={onConfirm}
				onOpenChange={onOpenChange}
			/>
		));

		fireEvent.click(screen.getByRole("button", { name: "Yes" }));
		expect(onConfirm).toHaveBeenCalled();
		expect(onOpenChange).toHaveBeenCalledWith(false);
	});

	it("calls onCancel and onOpenChange when the cancel button is clicked", () => {
		const onCancel = vi.fn();
		const onOpenChange = vi.fn();
		render(() => <AlertDialog open title="Confirm" onCancel={onCancel} onOpenChange={onOpenChange} />);

		fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
		expect(onCancel).toHaveBeenCalled();
		expect(onOpenChange).toHaveBeenCalledWith(false);
	});

	it("closes and calls onCancel when the overlay is clicked", () => {
		const onOpenChange = vi.fn();
		const onCancel = vi.fn();
		render(() => <AlertDialog open title="Confirm" onOpenChange={onOpenChange} onCancel={onCancel} />);

		const overlay = document.querySelector('[aria-hidden="true"]');
		expect(overlay).toBeTruthy();
		if (overlay) {
			fireEvent.click(overlay);
		}
		expect(onOpenChange).toHaveBeenCalledWith(false);
		expect(onCancel).toHaveBeenCalled();
	});

	it("closes and calls onCancel when Escape is pressed", () => {
		const onOpenChange = vi.fn();
		const onCancel = vi.fn();
		render(() => <AlertDialog open title="Confirm" onOpenChange={onOpenChange} onCancel={onCancel} />);

		fireEvent.keyDown(document, { key: "Escape" });
		expect(onOpenChange).toHaveBeenCalledWith(false);
		expect(onCancel).toHaveBeenCalled();
	});
});
