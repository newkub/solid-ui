import { describe, expect, it } from "vitest";
import { createTextField } from "./index";

describe("@wrikka/form", () => {
	it("createTextField returns a text field definition with the expected keys", () => {
		const field = createTextField("email", "Email");

		expect(field).toMatchObject({
			name: "email",
			type: "text",
			label: "Email",
		});
		expect(Object.keys(field).sort()).toEqual(["label", "name", "type"]);
	});

	it("createTextField omits the label when none is provided", () => {
		const field = createTextField("username");

		expect(field.name).toBe("username");
		expect(field.type).toBe("text");
		expect(field.label).toBeUndefined();
	});
});
