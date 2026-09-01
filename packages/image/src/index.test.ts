import { describe, expect, it } from "vitest";
import { buildIpxUrl, buildTransformString } from "./index";

describe("@wrikka/image", () => {
	it("buildTransformString serializes transform options into a string", () => {
		const result = buildTransformString({ width: 100, height: 50, format: "webp" });

		expect(typeof result).toBe("string");
		expect(result).toContain("w_100");
		expect(result).toContain("h_50");
		expect(result).toContain("f_webp");
	});

	it("buildTransformString returns an empty string when no options are provided", () => {
		expect(buildTransformString({})).toBe("");
	});

	it("buildIpxUrl builds an ipx-formatted URL with the encoded source", () => {
		const url = buildIpxUrl("/images/cat.png", "w_100,h_50");

		expect(url).toBe("/_ipx/w_100,h_50/%2Fimages%2Fcat.png");
	});
});
