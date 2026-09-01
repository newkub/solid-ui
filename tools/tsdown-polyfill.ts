/**
 * Polyfill for Promise.withResolvers() used by tsdown/rolldown on runtimes
 * that do not yet expose it (e.g. older Node/Bun versions).
 *
 * Import this at the top of each tsdown.config.ts before tsdown is loaded.
 */

interface PromiseWithResolvers<T> {
	promise: Promise<T>;
	resolve: (value: T | PromiseLike<T>) => void;
	reject: (reason?: unknown) => void;
}

interface PromiseConstructorWithResolvers extends PromiseConstructor {
	withResolvers?: <T>() => PromiseWithResolvers<T>;
}

const _Promise = Promise as PromiseConstructorWithResolvers;

if (typeof _Promise.withResolvers === "undefined") {
	_Promise.withResolvers = <T>() => {
		let resolve: (value: T | PromiseLike<T>) => void = () => {};
		let reject: (reason?: unknown) => void = () => {};
		const promise = new Promise<T>((res, rej) => {
			resolve = res;
			reject = rej;
		});
		return { promise, resolve, reject };
	};
}
