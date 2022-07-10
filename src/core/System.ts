import fs from 'fs'
import path from 'path'

////////////////////////////////////////

export namespace System
{
	export const exit = ( code = 0 ) => process.exit( code )

	/**
	 * Returns as is if it's already absolute, otherwise make it absolute
	 */
	export const getAbsolutePath = ( filePath: string ) =>
		path.isAbsolute(filePath)
			? filePath
			: path.join( process.cwd(), filePath )

	export const doesFileExists = ( path: string ) : boolean => fs.existsSync( getAbsolutePath( path ) ) || false
}
