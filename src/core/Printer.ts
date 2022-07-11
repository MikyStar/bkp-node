import chalk, {  } from 'chalk'

type Color = 'red' | 'green'

export const printMessage = ( message : string | string[], chalkColor ?: Color ) =>
{
	if( ( message === '' ) || ( message === [] ) )
		return

	message = Array.isArray( message ) ? message : [ message ]

	message.forEach( line =>
	{
		let text = line
		text = chalkColor ? chalk[ chalkColor  ]( text ) : text

		console.log( text )
	})
}

export const printError = ( message: string | string[] ) => printMessage( message, 'red' )