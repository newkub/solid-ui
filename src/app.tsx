import { createSignal } from 'solid-js'
import { createTextField } from '@wrikka/form'
import { textColumn } from '@wrikka/table'
import { buildIpxUrl, buildTransformString } from '@wrikka/image'
import { buildCssTransition, mergeTransitionOptions } from '@wrikka/transitions'

type TabKey = 'form' | 'table' | 'image' | 'transitions'

export function App() {
	const [tab, setTab] = createSignal<TabKey>('form')

	const formField = createTextField('email', 'Email', { placeholder: 'Enter your email' })
	const tableColumn = textColumn('email', 'Email')
	const imageTransform = buildTransformString({ width: 400, format: 'webp', quality: 80 })
	const imageUrl = buildIpxUrl('https://picsum.photos/800/600', imageTransform)
	const transition = buildCssTransition(mergeTransitionOptions({ duration: 300, easing: 'ease-in-out' }))

	const tabs: { key: TabKey; label: string }[] = [
		{ key: 'form', label: 'Form' },
		{ key: 'table', label: 'Table' },
		{ key: 'image', label: 'Image' },
		{ key: 'transitions', label: 'Transitions' },
	]

	return (
		<div class="app">
			<header>
				<h1>solid-ui</h1>
				<p>SolidJS UI library demo on Cloudflare Workers</p>
			</header>
			<nav>
				{tabs.map((t) => (
					<button
						class={tab() === t.key ? 'active' : ''}
						onClick={() => setTab(t.key)}
					>
						{t.label}
					</button>
				))}
			</nav>
			<main>
				{tab() === 'form' && (
					<section>
						<h2>Form field factory</h2>
						<pre>{JSON.stringify(formField, null, 2)}</pre>
					</section>
				)}
				{tab() === 'table' && (
					<section>
						<h2>Table column builder</h2>
						<pre>{JSON.stringify(tableColumn, null, 2)}</pre>
					</section>
				)}
				{tab() === 'image' && (
					<section>
						<h2>Image URL builder</h2>
						<img src={imageUrl} alt="Demo" class="demo-image" />
						<pre>{imageUrl}</pre>
					</section>
				)}
				{tab() === 'transitions' && (
					<section>
						<h2>Transition CSS</h2>
						<pre>{transition}</pre>
					</section>
				)}
			</main>
		</div>
	)
}