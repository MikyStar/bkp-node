import { System } from "./System"

import { FirstArgError } from "../errors/CLISyntaxErrors"
import { FileAlreadyExistsError, FileNotFoundError } from "../errors/FileErrors"
import { printMessage } from "./Printer"
import Help, { DEFAULT_CREATE_EXTENSION } from "./Help"
import { handleExtractExtension } from "../utils"

//////////////////// ////////////////////

export enum Action {
	CREATE = 'c',
	EXTRACT = 'x'
}

export const ARCHIVE_ALGO = 'tgz'
export const ENCRYPTION_ALGO = 'aes-256-cbc'


export enum Flag {
	HELP = '--help'
}

interface ArgOccurance
{
	arg: string
	index: number
}

//////////////////// ////////////////////

export class ArgHandler {
	private args: string[]

	action: Action

	sourcePath: string
	destPath: string

	isHelpNeeded: boolean

	constructor() {
		this.args = process.argv.slice( 2 )

		// Flags should be handled before positional args
		this.isHelpNeeded = this.searchFlag([ '-h', Flag.HELP ])

		if(this.isHelpNeeded || this.args[0] === undefined) {
			printMessage(Help.fullMan())
			System.exit(0)
		}

		this.setAction(this.args[0])
		this.setSource(this.args[1])
		this.setDest(this.args[2])
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
		const path = arg ||
			this.action === Action.CREATE
			? this.sourcePath + DEFAULT_CREATE_EXTENSION
			: handleExtractExtension(this.sourcePath)


		if( System.doesFileExists(path) )
			throw new FileAlreadyExistsError(path)

		this.destPath = path
	}

	////////////////////

	private searchFlag = (flagWrittings: string[]): boolean => {
		const occurances = this.extractOccurances(arg => flagWrittings.includes(arg))

		return occurances !== undefined
	}

	/**
	 * Find occurances in input order with their position that math the callback,
	 * returns them and delete them from the untreatedArgs array
	 * If none find, returns undefined
	 */
	private extractOccurances = (callback : (arg: string, index ?: number) => boolean ): ArgOccurance[] | undefined =>
	{
		const occurances: ArgOccurance[] = []

		this.args.forEach((arg, index) => {
			if(callback(arg, index))
				occurances.push({ arg, index })
		})

		if( occurances.length === 0 )
			return undefined

		/** @see: https://www.codegrepper.com/code-examples/javascript/array+splice+in+for+loop+javascript */
		for (let i = occurances.length - 1; i >= 0; i--)
			this.args.splice(occurances[ i ].index, 1);

		return occurances
	}
}