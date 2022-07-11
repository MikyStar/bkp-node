import chalk from "chalk"

// @ts-ignore
import pkg from '../../package.json'
import { Action, ArchiveAlgo, DEFAULT_ARCHIVE_ALGO, DEFAULT_ENCRYPTION_ALGO, EncryptionAlgo } from "../core/ArgHandler"

////////////////////////////////////////

interface ManPage
{
	title ?: string
	prototype ?: string
	argDef ?: string[]
	furtherDescription ?: string[]
	footer ?: boolean
	examples ?: string[]
}

export interface ManEntries
{
	create: ManPage
	extract: ManPage
}

type ManEntryKey = keyof ManEntries

////////////////////////////////////////

/**
 * Expose lines of decorated text as array for help flag
 */
class Help implements ManEntries
{
	private footer: string[]

	version: string[]

	create: ManPage;
	extract: ManPage;

	////////////////////

	constructor()
	{
		const { bold } = chalk

		this.footer =
		[
			'',
			'-----',
			`${ bold( pkg.name ) }: ${ pkg.description }`,
			`Version: ${ bold( pkg.version ) }`,
			`More informations and examples at ${ bold( pkg.repository.url )}`
		]

		//////////

		this.version = [ `${ pkg.version }` ]

		this.create =
		{
			title: 'Create a compressed, encrypted backup',
			prototype: 'bkp <c|create> <source path> [<destination path>] [<archive algorithm>] [<encryption algorithm>]',
			argDef:
			[
				`<source path> : Absolute or relative path to what you want to backup`,
				`[<destination path>] : Optional, absolute or relative path to where you want your backup file`,
				`[<archive algorithm>] : Optional, ${Object.values(ArchiveAlgo)}, default '${DEFAULT_ARCHIVE_ALGO}'`,
				`[<encryption algorithm>] : Optional, ${Object.values(EncryptionAlgo)}, default '${DEFAULT_ENCRYPTION_ALGO}'`,
			]
		}

		this.extract =
		{
			title: 'Extract the content of a backup',
			prototype: 'bkp <x|extract> <source path> [<destination path>]  [<archive algorithm>] [<encryption algorithm>]',
			argDef:
			[
				`<source path> : Absolute or relative path to your backup location`,
				`[<destination path>] : Optional, absolute or relative path to where you want your clear content`,
				`[<archive algorithm>] : Optional, ${Object.values(ArchiveAlgo)}, default '${DEFAULT_ARCHIVE_ALGO}'`,
				`[<encryption algorithm>] : Optional, ${Object.values(EncryptionAlgo)}, default '${DEFAULT_ENCRYPTION_ALGO}'`,
			]
		}
	}

	////////////////////

	getMan = ( action: ManEntryKey ) => this.makeMan( { ...this[ action ], footer: true } )

	fullMan = () =>
	{
		let toReturn: string[] = []

		const entries: ManEntryKey[] = ['create', 'extract']

		entries.forEach( entry =>
		{
			const man = this.makeMan({ ...this[ entry ], footer: false })
			toReturn = [ ...toReturn, ...man, '', '-----' ]
		});

		return	[
					...toReturn,
					...this.footer
				]
	}

	handleAction = ( action: Action ) =>
	{
		let toReturn: string[] = []

		switch( action )
		{
			case Action.CREATE:
				toReturn = this.getMan( 'create' )
				break;
			case Action.EXTRACT:
				toReturn = this.getMan( 'extract' )
				break;
		}

		return toReturn
	}

	////////////////////

	private makeMan = ( manPage : ManPage ) =>
	{
		const { bold, underline } = chalk

		let toReturn : string[] = []

		if( manPage.title )
			toReturn = [ ...toReturn, underline( manPage.title ), '' ]

		if( manPage.prototype )
			toReturn = [ ...toReturn, bold( manPage.prototype ), '' ]

		if( manPage.argDef )
			toReturn = [ ...toReturn, ...manPage.argDef ]

		if( manPage.furtherDescription )
			toReturn = [ ...toReturn, '' , ...manPage.furtherDescription ]

		if( manPage.examples )
			toReturn = [ ...toReturn, '' , underline( 'Examples :' ), '', ...manPage.examples ]

		return toReturn
	}
}

////////////////////////////////////////

export default new Help()