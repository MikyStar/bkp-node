import { CatchableError } from './CatchableError';

////////////////////////////////////////

export class CompressError extends CatchableError
{
	constructor(error ?: any )
	{
		super( `An error occured during compression`, error )
	}
}

////////////////////////////////////////

export class ExtractError extends CatchableError
{
	constructor( error ?: any )
	{
		super( `An error occured during extraction`, error )
	}
}
