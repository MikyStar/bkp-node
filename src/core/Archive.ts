import compressing from 'compressing'

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
			console.error(e)
		}
	}

	extract = async () =>
	{}
}