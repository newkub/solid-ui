import { describe, expect, it } from "vitest";
import { textColumn } from "./index";

describe("@wrikka/table", () => {
	it("textColumn returns a string column definition", () => {
		const column = textColumn("name", "Name");

		expect(column).toEqual({
			key: "name",
			header: "Name",
			type: "string",
		});
	});

	it("textColumn merges extra options into the column definition", () => {
		const column = textColumn("name", "Name", { sortable: true });

		expect(column).toMatchObject({
			key: "name",
			header: "Name",
			type: "string",
			sortable: true,
		});
	});
});
