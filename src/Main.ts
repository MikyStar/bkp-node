import { System } from './core/System'

import { ArgHandler } from "./core/ArgHandler";
import Help from './core/Help';
import { printMessage, printError } from './core/Printer';

import { CatchableError } from "./errors/CatchableError";
import { CLISyntaxError } from './errors/CLISyntaxErrors';

////////////////////////////////////////

try
	{
		const { action, sourcePath, destPath } = new ArgHandler()

		console.log(action, sourcePath, destPath)
	}
	catch( error )
	{
		if( !( error instanceof CatchableError ) )
			console.error( error )
		else {
			if( error instanceof CLISyntaxError )
			{
				const { message, manEntries } = error

				printError( message )

				manEntries.forEach(entry => printMessage( [ '', ...Help.getMan( entry )] ))
			}
			else
				printError( error.message )
		}

		System.exit( -1 )
	}