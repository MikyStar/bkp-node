import compressing from 'compressing'
import { CompressError, ExtractError } from '../errors/ArchiveErrors'

import { ArchiveAlgo } from "./ArgHandler"
import { System } from "./System"

////////////////////////////////////////

export class Archive
{
	srcPath: string
	destPath: string

	algo: ArchiveAlgo

	constructor(srcPath: string, destPath: string, algo: ArchiveAlgo) {
		this.srcPath = srcPath
		this.destPath = destPath
		this.algo = algo
	}

	compress = async () => {
		try {
			await compressing[this.algo].compressFile(this.srcPath, this.destPath)
		}
		catch (e) {
			throw new CompressError(e)
		}
	}

	extract = async () => {
		try {
			await compressing[this.algo].uncompress(this.srcPath, this.destPath)
		}
		catch (e) {
			throw new ExtractError(e)
		}
	}
}