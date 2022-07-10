enum Action {
	CREATE = 'c',
	EXTRACT = 'x'
}

export class ArgHandler {
	action: Action
	sourcePath: string
	destPath: string

	constructor() {
		const args = process.argv.slice( 2 )

		this.action = args[0] as Action
		this.sourcePath = args[1]
		this.destPath = args[2] || `${this.sourcePath}.${this.action === Action.CREATE ? 'enc' : 'dec'}`
	}
}