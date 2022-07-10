import { FirstArgError } from "../errors/CLISyntaxErrors"
import { FileAlreadyExistsError, FileNotFoundError } from "../errors/FileErrors"
import Help from "./Help"
import { printError, printMessage } from "./Printer"
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

		this.setAction(args[0])
		this.setSource(args[1])
		this.setDest(args[2])
	}

	private setAction = (arg: string) => {
		const allowedCreate = ['create', Action.CREATE]
		const allowedExtract = ['extract', Action.EXTRACT]

		if(allowedCreate.includes(arg))
			this.action =  Action.CREATE
		else if(allowedExtract.includes(arg))
			this.action =  Action.EXTRACT
		else
			throw new FirstArgError(arg)
	}

	private setSource = (arg: string) => {
		if( !System.doesFileExists(arg) )
			throw new FileNotFoundError(arg)

		this.sourcePath = arg
	}

	private setDest = (arg: string) => {
		const path = arg || `${this.sourcePath}.${this.action === Action.CREATE ? 'enc' : 'dec'}`

		if( System.doesFileExists(path) )
			throw new FileAlreadyExistsError(path)

		this.destPath = path
	}
}