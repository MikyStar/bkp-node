import { System } from "./System"

import { UnsuportedArchiveAlgo } from "../errors/ArchiveErrors"
import { FirstArgError } from "../errors/CLISyntaxErrors"
import { UnsuportedEncryptionAlgo } from "../errors/EncryptionErrors"
import { FileAlreadyExistsError, FileNotFoundError } from "../errors/FileErrors"

//////////////////// ////////////////////

export enum Action {
	CREATE = 'c',
	EXTRACT = 'x'
}

export enum ArchiveAlgo {
	TAR = 'tar',
	TGZ = 'tgz',
	ZIP = 'zip'
}

export enum EncryptionAlgo {
	SOMETHING = 'todo',
}

export enum ValueFlag {
	ARCHIVE_ALGO = '-a',
	ENCRYPTION_ALGO = '-e',
}

interface ArgOccurance
{
	arg: string
	index: number
}

export const DEFAULT_ARCHIVE_ALGO: ArchiveAlgo = ArchiveAlgo.TGZ

//////////////////// ////////////////////

export class ArgHandler {
	private args: string[]

	action: Action

	sourcePath: string
	destPath: string

	archiveAlgo: ArchiveAlgo
	encryptionAlgo: EncryptionAlgo

	constructor() {
		this.args = process.argv.slice( 2 )

		// Value flags should be handled before positional args
		this.setArchiveAlgo()
		this.setEncryptionAlgo()

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
		const path = arg || `${this.sourcePath}.${this.action === Action.CREATE ? 'enc' : 'dec'}`

		if( System.doesFileExists(path) )
			throw new FileAlreadyExistsError(path)

		this.destPath = path
	}

	private setArchiveAlgo = () => {
		const arg = this.searchValueFlag(ValueFlag.ARCHIVE_ALGO)

		if(arg && !Object.values(ArchiveAlgo).includes(arg as ArchiveAlgo))
			throw new UnsuportedArchiveAlgo(arg)

		const algo = arg as ArchiveAlgo || DEFAULT_ARCHIVE_ALGO

		this.archiveAlgo = algo
	}

	private setEncryptionAlgo = () => {
		const arg = this.searchValueFlag(ValueFlag.ENCRYPTION_ALGO)

		if(arg && !Object.values(EncryptionAlgo).includes(arg as EncryptionAlgo))
			throw new UnsuportedEncryptionAlgo(arg)

		const algo = arg as EncryptionAlgo || EncryptionAlgo.SOMETHING

		this.encryptionAlgo = algo
	}

	////////////////////

	private searchValueFlag = (flag: ValueFlag): string => {
		let tempFlagIndex = undefined // To get the next arg after the flag
		const occurances = this.extractOccurances((arg, index) => {
			if(tempFlagIndex) {
				tempFlagIndex = undefined
				return true
			}

			if(arg === flag) {
				tempFlagIndex = index
				return true
			}

			return false
		})

		if( occurances === undefined )
			return undefined

		const lastValue = occurances[ occurances.length - 1]

		return lastValue.arg
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