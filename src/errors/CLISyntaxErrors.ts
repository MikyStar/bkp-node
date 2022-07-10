import { CatchableError } from './CatchableError';

import { ManEntries } from '../core/Help';

////////////////////////////////////////

type Entries =  keyof ManEntries

////////////////////////////////////////


export class CLISyntaxError extends CatchableError
{
	manEntries: Entries[]

	constructor( message: string, manEntries: Entries[], details ?: any )
	{
		super( message, details )
		this.manEntries = manEntries
	}
}

////////////////////////////////////////

export class FirstArgError extends CLISyntaxError
{
	constructor( message: string, details ?: any )
	{
		super( message, ['create', 'extract'], details )
	}
}

////////////////////////////////////////

export class CreateError extends CLISyntaxError
{
	constructor( message: string, details ?: any )
	{
		super( message, ['create'], details )
	}
}

////////////////////////////////////////

export class ExtractError extends CLISyntaxError
{
	constructor( message: string, details ?: any )
	{
		super( message, ['extract'], details )
	}
}
