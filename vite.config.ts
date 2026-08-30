import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import path from 'node:path'

const formRoot = path.resolve('packages/form/src').replace(/\\/g, '/')
const imageRoot = path.resolve('packages/image/src').replace(/\\/g, '/')
const tableRoot = path.resolve('packages/table/src').replace(/\\/g, '/')
const tableDomain = path.resolve('packages/table/src/modules/table').replace(/\\/g, '/')
const transitionsRoot = path.resolve('packages/transitions/src').replace(/\\/g, '/')

export default defineConfig({
	plugins: [solid()],
	resolve: {
		alias: [
			{ find: /^#form$/, replacement: `${formRoot}/index.ts` },
			{ find: /^#form\/(.*)$/, replacement: `${formRoot}/$1` },
			{ find: /^#image$/, replacement: `${imageRoot}/index.ts` },
			{ find: /^#image\/(.*)$/, replacement: `${imageRoot}/$1` },
			{ find: /^#table$/, replacement: `${tableDomain}/index.ts` },
			{ find: /^#table\/(.*)$/, replacement: `${tableDomain}/$1` },
			{ find: /^#transitions$/, replacement: `${transitionsRoot}/index.ts` },
			{ find: /^#transitions\/(.*)$/, replacement: `${transitionsRoot}/$1` },
			{ find: /^@wrikka\/form$/, replacement: `${formRoot}/index.ts` },
			{ find: /^@wrikka\/image$/, replacement: `${imageRoot}/index.ts` },
			{ find: /^@wrikka\/table$/, replacement: `${tableRoot}/index.ts` },
			{ find: /^@wrikka\/transitions$/, replacement: `${transitionsRoot}/index.ts` },
		],
	},
})