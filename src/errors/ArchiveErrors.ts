import { ArchiveAlgo } from '../core/ArgHandler';
import { CatchableError } from './CatchableError';

////////////////////////////////////////

export class UnsuportedArchiveAlgo extends CatchableError
{
	constructor( algo: string, error ?: any )
	{
		super( `Archive algorith '${algo}' is not supported, use one of ${Object.values(ArchiveAlgo)}`, error )
	}
}

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
