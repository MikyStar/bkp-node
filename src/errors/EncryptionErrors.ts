import { EncryptionAlgo } from '../core/ArgHandler';
import { CatchableError } from './CatchableError';

////////////////////////////////////////

export class UnsuportedEncryptionAlgo extends CatchableError
{
	constructor( algo: string, error ?: any )
	{
		super( `Encryption algorith '${algo}' is not supported, use one of ${Object.values(EncryptionAlgo)}`, error )
	}
}
