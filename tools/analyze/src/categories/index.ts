import type { CategoryCheck } from "../types";
import { categories as architecture } from "./architecture";
import { categories as codeQuality } from "./code-quality";
import { categories as dependencies } from "./dependencies";
import { categories as documentation } from "./documentation";
import { categories as projectConfig } from "./project-config";
import { categories as security } from "./security";
import { categories as tooling } from "./tooling";

export const categories: CategoryCheck[] = [
	...codeQuality,
	...architecture,
	...dependencies,
	...security,
	...documentation,
	...tooling,
	...projectConfig,
];

export const domains = ["code-quality", "architecture", "dependencies", "security", "documentation"];
