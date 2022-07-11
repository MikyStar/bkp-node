import { System } from './core/System'

import { Action, ArgHandler } from "./core/ArgHandler";
import Help from './core/Help';
import { printMessage, printError } from './core/Printer';

import { CatchableError } from "./errors/CatchableError";
import { CLISyntaxError } from './errors/CLISyntaxErrors';
import { Archive } from './core/Archive';
import { Encryption } from './core/Encryption';
import { secretPrompt } from './core/Prompt';

////////////////////////////////////////

const app = async () => {
	try {
		const { action, sourcePath, destPath } = new ArgHandler()

		const TEMP_FILE = '.archive.temp'

		switch(action) {
			case Action.CREATE: {
				printMessage('Compression ...')
				await Archive.compress({ sourcePath, destPath: TEMP_FILE })
				printMessage('done')

				printMessage('')

				printMessage('Encryption ...')
				const password = await secretPrompt('Password: ')
				const iv = await Encryption.encrypt({ sourcePath: TEMP_FILE, destPath,
					password })
				printMessage('done')
				printMessage('Here is your initialization vector, you must store it as it is required to decrypt', 'red')
				printMessage([ '', iv, '' ])

				break;
			}
			case Action.EXTRACT: {
				printMessage('Decryption ...')
				const password = await secretPrompt('Password: ')
				const initializationVector = await secretPrompt('Initialization vector: ')
				await Encryption.decrypt({ sourcePath, destPath: TEMP_FILE,
					password, initializationVector })
				printMessage('done')

				printMessage('Extraction ...')
				await Archive.extract({ sourcePath: TEMP_FILE, destPath })
				printMessage('done')

				break;
			}
		}

		System.deleteFile(TEMP_FILE)

		System.exit( 0 )
	}
	catch( error )
	{
		if( !( error instanceof CatchableError ) )
			console.error( error )
		else {
			if( error instanceof CLISyntaxError )
			{
				const { message, manEntries, details } = error

				printError([message, details])

				manEntries.forEach(entry => printMessage( [ '', ...Help.getMan( entry )] ))
			}
			else
				printError( error.message )
		}

		System.exit( -1 )
	}
}

app()