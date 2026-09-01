import { cleanup, fireEvent, render, screen } from "@solidjs/testing-library";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ContextMenu } from "./ContextMenu";

const createItems = () => [
	{ label: "Copy", onClick: vi.fn() },
	{ label: "Paste", onClick: vi.fn(), disabled: true },
	{ label: "Cut", onClick: vi.fn() },
];

describe("ContextMenu", () => {
	afterEach(cleanup);

	it("renders the trigger button with children", () => {
		render(() => <ContextMenu items={createItems()}>Right click me</ContextMenu>);
		const trigger = screen.getByRole("button", { name: "Right click me" });
		expect(trigger.tagName).toBe("BUTTON");
		expect(trigger.getAttribute("aria-haspopup")).toBe("menu");
	});

	it("applies a custom class to the trigger", () => {
		render(() => (
			<ContextMenu class="custom-context" items={createItems()}>
				Right click me
			</ContextMenu>
		));
		const trigger = screen.getByRole("button", { name: "Right click me" });
		expect(trigger.classList.contains("custom-context")).toBe(true);
		expect(trigger.classList.contains("inline-block")).toBe(true);
	});

	it("opens on right-click and displays menu items", () => {
		render(() => <ContextMenu items={createItems()}>Right click me</ContextMenu>);
		const trigger = screen.getByRole("button", { name: "Right click me" });
		fireEvent.contextMenu(trigger);

		const menu = screen.getByRole("menu");
		expect(menu).toBeTruthy();
		expect(screen.getByRole("menuitem", { name: "Copy" })).toBeTruthy();
		expect(screen.getByRole("menuitem", { name: "Paste" })).toBeTruthy();
		expect(screen.getByRole("menuitem", { name: "Cut" })).toBeTruthy();
	});

	it("calls onClick and closes when an enabled item is selected", () => {
		const items = createItems();
		render(() => <ContextMenu items={items}>Right click me</ContextMenu>);
		const trigger = screen.getByRole("button", { name: "Right click me" });
		fireEvent.contextMenu(trigger);

		const copy = screen.getByRole("menuitem", { name: "Copy" });
		fireEvent.click(copy);
		expect(items[0].onClick).toHaveBeenCalled();
		expect(screen.queryByRole("menu")).toBeNull();
	});

	it("does not call onClick for disabled items", () => {
		const items = createItems();
		render(() => <ContextMenu items={items}>Right click me</ContextMenu>);
		fireEvent.contextMenu(screen.getByRole("button", { name: "Right click me" }));

		const paste = screen.getByRole("menuitem", { name: "Paste" });
		fireEvent.click(paste);
		expect(items[1].onClick).not.toHaveBeenCalled();
		expect(screen.getByRole("menu")).toBeTruthy();
	});

	it("closes when clicking outside the menu", () => {
		render(() => <ContextMenu items={createItems()}>Right click me</ContextMenu>);
		fireEvent.contextMenu(screen.getByRole("button", { name: "Right click me" }));
		expect(screen.getByRole("menu")).toBeTruthy();

		fireEvent.mouseDown(document.body);
		expect(screen.queryByRole("menu")).toBeNull();
	});

	it("closes on Escape", () => {
		render(() => <ContextMenu items={createItems()}>Right click me</ContextMenu>);
		fireEvent.contextMenu(screen.getByRole("button", { name: "Right click me" }));
		expect(screen.getByRole("menu")).toBeTruthy();

		fireEvent.keyDown(document, { key: "Escape" });
		expect(screen.queryByRole("menu")).toBeNull();
	});
});
