// Image Module - Cloudinary URL Builder
// This module handles Cloudinary URL building

import type { ImageTransform } from "#image/domain/models";
import { normalizeTransform } from "./transforms-normalize";

export const buildCloudinaryUrl = (
	src: string,
	options: ImageTransform,
	cloudName?: string,
): string => {
	const normalized = normalizeTransform(options);
	const transforms: string[] = [];

	if (normalized.width) transforms.push(`w_${normalized.width}`);
	if (normalized.height) transforms.push(`h_${normalized.height}`);
	if (normalized.fit) transforms.push(`c_${normalized.fit}`);
	if (normalized.quality) transforms.push(`q_${normalized.quality}`);
	if (normalized.format) transforms.push(`f_${normalized.format}`);
	if (normalized.blur) transforms.push(`e_blur:${normalized.blur}`);
	if (normalized.sharpen) transforms.push(`e_sharpen:${normalized.sharpen}`);

	const transformString =
		transforms.length > 0 ? `${transforms.join(",")}/` : "";
	const cloud = cloudName || "demo";

	// Check if src is already a full URL
	if (src.startsWith("http")) {
		return `https://res.cloudinary.com/${cloud}/image/fetch/${transformString}${src}`;
	}

	return `https://res.cloudinary.com/${cloud}/image/upload/${transformString}${src}`;
};
