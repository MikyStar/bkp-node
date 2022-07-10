import { System } from './core/System'

import { CatchableError } from "./errors/CatchableError";
import { ArgHandler } from "./core/ArgHandler";

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
	else
		console.warn( error )

	System.exit( -1 )
}