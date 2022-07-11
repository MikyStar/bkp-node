import compressing from 'compressing'
import { CompressError, ExtractError } from '../errors/ArchiveErrors'

import { ArchiveAlgo } from "./ArgHandler"
import { System } from "./System"

////////////////////////////////////////

interface Args {
	sourcePath: string
	destPath: string

	algo: ArchiveAlgo
}

export namespace Archive
{
	export const compress = async ({ sourcePath, destPath, algo }: Args) => {
		try {
			if ( System.isDirectory(sourcePath) )
				await compressing[algo].compressDir(sourcePath, destPath)
			else
				await compressing[algo].compressFile(sourcePath, destPath)
		}
		catch (e) {
			console.log(e)
			throw new CompressError(e)
		}
	}

	export const extract = async ({ sourcePath, destPath, algo }: Args) => {
		try {
			await compressing[algo].uncompress(sourcePath, destPath)
		}
		catch (e) {
			throw new ExtractError(e)
		}
	}
}