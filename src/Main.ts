import { System } from './core/System'

import { Action, ArgHandler } from "./core/ArgHandler";
import Help from './core/Help';
import { printMessage, printError } from './core/Printer';

import { CatchableError } from "./errors/CatchableError";
import { CLISyntaxError } from './errors/CLISyntaxErrors';
import { Archive } from './core/Archive';

////////////////////////////////////////

const app = async () => {
	try {
		const { action, sourcePath, destPath, archiveAlgo } = new ArgHandler()

		console.log(action, sourcePath, destPath, archiveAlgo)

		switch(action) {
			case Action.CREATE: {
				const archive = new Archive(sourcePath, destPath, archiveAlgo)

				await archive.compress()

				break;
			}
		}
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
}

app()