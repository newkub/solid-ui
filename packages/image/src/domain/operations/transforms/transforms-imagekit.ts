// Image Module - ImageKit URL Builder
// This module handles ImageKit URL building

import type { ImageTransform } from "#image/domain/models";
import { normalizeTransform } from "./transforms-normalize";

export const buildImagekitUrl = (
	src: string,
	options: ImageTransform,
	accountId?: string,
): string => {
	const normalized = normalizeTransform(options);
	const parts: string[] = [];

	if (normalized.width) parts.push(`w-${normalized.width}`);
	if (normalized.height) parts.push(`h-${normalized.height}`);
	if (normalized.quality && normalized.quality !== 80)
		parts.push(`q-${normalized.quality}`);
	if (normalized.format) parts.push(`f-${normalized.format}`);
	if (normalized.fit) parts.push(`fit-${normalized.fit}`);
	if (normalized.blur) parts.push(`bl-${normalized.blur}`);

	const transforms = parts.length > 0 ? `${parts.join(",")}/` : "";
	const endpoint = accountId
		? `https://ik.imagekit.io/${accountId}`
		: "https://ik.imagekit.io/your accountId";

	// Check if src is already a full URL
	if (src.startsWith("http")) {
		return `${endpoint}/tr:${transforms}${src}`;
	}

	return `${endpoint}/${transforms}${src}`;
};
