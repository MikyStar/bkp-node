import { CatchableError } from './CatchableError';

////////////////////////////////////////

export class FileNotFoundError extends CatchableError
{
	constructor( fullPath: string, error ?: any )
	{
		super( `File '${ fullPath }' can't be found`, error )
	}
}

export class FileAlreadyExistsError extends CatchableError
{
	constructor( fullPath: string )
	{
		super( `File ${ fullPath } already exists` )
	}
}

export class SaveFileError extends CatchableError
{
	constructor( fullPath: string, error ?: any )
	{
		super( `Problem saving ${ fullPath } `, error )
	}
}

export class FileTypeError extends CatchableError
{
	constructor( fullPath: string, error ?: any )
	{
		super( `Path '${fullPath}' should reference a file or directory`, error )
	}
}