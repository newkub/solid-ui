import { describe, expect, it } from "vitest";
import { createCommandRepository } from "./adapters/db/command-repository-adapter";
import { searchCommandsUseCase } from "./modules/command-palette/application/usecases/search";
import { COMMAND_LABEL_MAX_LENGTH } from "./modules/command-palette/domain/constants";

describe("@wrikka/command-palette public API", () => {
	it("exports search use case and domain constants", () => {
		expect(searchCommandsUseCase).toBeTypeOf("function");
		expect(COMMAND_LABEL_MAX_LENGTH).toBeGreaterThan(0);
	});

	it("creates an empty in-memory command repository", () => {
		const repo = createCommandRepository({ commands: new Map() });
		expect(repo).toBeDefined();
	});
});
