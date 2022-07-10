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
	GZIP = 'gzip',
	ZIP = 'zip'
}

export enum EncryptionAlgo {
	SOMETHING = 'todo',
}

export enum ValueFlag {
	ARCHIVE_ALGO = '-a',
	ENCRYPTION_ALGO = '-e',
}

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

		this.setAction(this.args[0])
		this.setSource(this.args[1])
		this.setDest(this.args[2])
		this.setArchiveAlgo()
		this.setEncryptionAlgo()
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

		const algo = arg as ArchiveAlgo || ArchiveAlgo.TAR

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
		const index = this.args.findIndex(arg => arg === flag)

		if(index === -1 )
			return undefined

		return this.args[ index +1 ]
	}
}