import { System } from './core/System'

import { Action, ArgHandler } from "./core/ArgHandler";
import Help from './core/Help';
import { printMessage, printError } from './core/Printer';

import { CatchableError } from "./errors/CatchableError";
import { CLISyntaxError } from './errors/CLISyntaxErrors';
import { Archive } from './core/Archive';
import { Encryption } from './core/Encryption';

////////////////////////////////////////

const app = async () => {
	try {
		const { action, sourcePath, destPath, archiveAlgo, encryptionAlgo } = new ArgHandler()

		const FAKE_PASSWORD = 'yhuhujij,"xb'
		const FAKE_IV = '0000'
		const TEMP_FILE = '.archive.temp'

		console.log(action, sourcePath, destPath, archiveAlgo, encryptionAlgo)

		switch(action) {
			case Action.CREATE: {
				printMessage('Compression ...')
				await Archive.compress({ sourcePath, destPath: TEMP_FILE, algo: archiveAlgo })
				printMessage('done')

				printMessage('')

				printMessage('Encryption ...')
				await Encryption.encrypt({ sourcePath: TEMP_FILE, destPath,
					algo: encryptionAlgo, password: FAKE_PASSWORD })
				printMessage('done')

				break;
			}
			case Action.EXTRACT: {
				printMessage('Decryption ...')
				await Encryption.decrypt({ sourcePath, destPath: TEMP_FILE,
					algo: encryptionAlgo, password: FAKE_PASSWORD, initializationVector: FAKE_IV })
				printMessage('done')

				printMessage('Extraction ...')
				await Archive.extract({ sourcePath: TEMP_FILE, destPath, algo: archiveAlgo })
				printMessage('done')

				break;
			}
		}
		// TODO delete temp file

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