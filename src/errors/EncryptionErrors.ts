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

////////////////////////////////////////

export class EncryptError extends CatchableError
{
	constructor(error ?: any )
	{
		super( `An error occured during encryption`, error )
	}
}

////////////////////////////////////////

export class DecryptError extends CatchableError
{
	constructor( error ?: any )
	{
		super( `An error occured during decryption`, error )
	}
}
