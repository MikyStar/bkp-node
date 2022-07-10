import Help from "./Help"
import { printError } from "./Printer"
import { System } from "./System"

//////////////////// ////////////////////

export enum Action {
	CREATE = 'c',
	EXTRACT = 'x'
}

//////////////////// ////////////////////

export class ArgHandler {
	action: Action
	sourcePath: string
	destPath: string

	constructor() {
		const args = process.argv.slice( 2 )

		this.action = this.setAction(args[0])
		this.sourcePath = args[1]
		this.destPath = args[2] || `${this.sourcePath}.${this.action === Action.CREATE ? 'enc' : 'dec'}`
	}

	private setAction = (arg: string) => {
		const allowedCreate = ['create', Action.CREATE]
		const allowedExtract = ['extract', Action.EXTRACT]

		if(allowedCreate.includes(arg))
			return Action.CREATE
		else if(allowedExtract.includes(arg))
			return Action.EXTRACT
		else {
			console.error(`Argument ${arg} unrecognized`)
			printError( Help.fullMan() )
			System.exit(-1)

			throw new Error()
		}
	}
}