import { basename, join } from 'path'

export default function copyRoutesJson(options = {}) {
	const { targets = [], hook = 'buildEnd' } = options

	const callback = async function() {
		targets.forEach(async target => {

			// Import target.src as a module and convert to JSON.
			// Only works with "type": "module" in package.json.
			const routes     = await import(`${target.src}?${Date.now()}`)
			const importFrom = target.importFrom || 'default'
			const contents   = JSON.stringify(routes[importFrom], null, 2)
			const destFile   = target.dest || basename(target.src).replace('.js', '.json');

			await this.emitFile({
				type: 'asset',
				name: destFile,
				fileName: destFile,
				source: contents,
			})
		})
	};

	return {
		name: 'copy-routes-json',
		apply: 'build',
		[hook]: callback,
	}
}