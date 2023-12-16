import { basename, join } from 'path'
import fs from 'fs/promises'

const copyRoutesJson = (options = {}) => {
	const { targets = [], hook = 'buildEnd' } = options
	return {
		name: 'copy-routes-json',
		[hook]: () => {
			targets.forEach(async target => {

				const routes = await import(target.src)
				const contents = JSON.stringify(routes.default, null, 2)
				await fs.mkdir(target.dest, { recursive: true })

				const destPath = join(target.dest, basename(target.src).replace('.js', '.json'))
				// Now write the routes as JSON into the destPath
				await fs.writeFile(destPath, contents)
			})
		}
	}
}
export default copyRoutesJson