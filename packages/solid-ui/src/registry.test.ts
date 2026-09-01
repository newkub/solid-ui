import { describe, expect, it } from "vitest";
import { registry } from "./registry";

describe("@wrikka/solid-ui registry", () => {
	it("exposes exactly 82 registry entries", () => {
		expect(Array.isArray(registry)).toBe(true);
		expect(registry).toHaveLength(82);
	});

	it("includes well-known components with a name, tag, and description", () => {
		const names = registry.map((item) => item.name);

		expect(names).toContain("Button");
		expect(names).toContain("Dialog");
		expect(names).toContain("DataTable");

		const button = registry.find((item) => item.name === "Button");
		expect(button).toMatchObject({ name: "Button", tag: "button" });
		expect(button?.description.length).toBeGreaterThan(0);
	});
});
