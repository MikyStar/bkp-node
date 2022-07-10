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
