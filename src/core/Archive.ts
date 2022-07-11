import compressing from 'compressing'
import { CompressError, ExtractError } from '../errors/ArchiveErrors'
import { ARCHIVE_ALGO } from './ArgHandler'

import { System } from "./System"

////////////////////////////////////////

interface Args {
	sourcePath: string
	destPath: string
}

export namespace Archive
{
	export const compress = async ({ sourcePath, destPath }: Args) => {
		try {
			if ( System.isDirectory(sourcePath) )
				await compressing[ARCHIVE_ALGO].compressDir(sourcePath, destPath)
			else
				await compressing[ARCHIVE_ALGO].compressFile(sourcePath, destPath)
		}
		catch (e) {
			console.log(e)
			throw new CompressError(e)
		}
	}

	export const extract = async ({ sourcePath, destPath }: Args) => {
		try {
			await compressing[ARCHIVE_ALGO].uncompress(sourcePath, destPath)
		}
		catch (e) {
			throw new ExtractError(e)
		}
	}
}