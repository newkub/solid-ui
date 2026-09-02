import { createEffect, onCleanup } from "solid-js";
import { OG_IMAGE_SRC, SITE_URL } from "../lib/config";

export interface SeoProps {
	/** Full page title, set verbatim on `document.title` (e.g. "Components — solid-ui"). */
	title: string;
	/** Short description used for `meta[name=description]` and social cards. */
	description: string;
	/** Absolute or relative image URL for Open Graph / Twitter cards. */
	image?: string;
	/** Path (starting with `/`) used to build the canonical URL and `og:url`. */
	path?: string;
	/** Open Graph type, e.g. `website` or `article`. */
	type?: string;
}

function toAbsoluteUrl(value: string): string {
	if (value.startsWith("http")) return value;
	return `${SITE_URL}${value.startsWith("/") ? value : `/${value}`}`;
}

function setMetaByName(name: string, content: string) {
	let el = document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
	if (!el) {
		el = document.createElement("meta");
		el.setAttribute("name", name);
		document.head.appendChild(el);
	}
	el.setAttribute("content", content);
	return el;
}

function setMetaByProperty(property: string, content: string) {
	let el = document.head.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
	if (!el) {
		el = document.createElement("meta");
		el.setAttribute("property", property);
		document.head.appendChild(el);
	}
	el.setAttribute("content", content);
	return el;
}

function setCanonicalLink(href: string) {
	let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
	if (!el) {
		el = document.createElement("link");
		el.setAttribute("rel", "canonical");
		document.head.appendChild(el);
	}
	el.setAttribute("href", href);
	return el;
}

/**
 * Head-only component that sets page-level meta tags (title, description,
 * Open Graph, Twitter card, canonical link) via direct DOM APIs. It manages
 * no visible UI and does not depend on `@solidjs/meta`, which is not a
 * dependency of this app.
 */
export function Seo(props: SeoProps) {
	const previousTitle = document.title;

	createEffect(() => {
		const path = props.path ?? window.location.pathname;
		const url = toAbsoluteUrl(path);
		const image = toAbsoluteUrl(props.image ?? OG_IMAGE_SRC);
		const type = props.type ?? "website";

		document.title = props.title;

		setMetaByName("description", props.description);
		setMetaByProperty("og:title", props.title);
		setMetaByProperty("og:description", props.description);
		setMetaByProperty("og:type", type);
		setMetaByProperty("og:url", url);
		setMetaByProperty("og:image", image);
		setMetaByName("twitter:card", "summary_large_image");
		setMetaByName("twitter:title", props.title);
		setMetaByName("twitter:description", props.description);
		setMetaByName("twitter:image", image);
		setCanonicalLink(url);
	});

	onCleanup(() => {
		document.title = previousTitle;
	});

	return null;
}
