import { CatchableError } from './CatchableError';

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
