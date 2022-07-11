import prompt from 'password-prompt'

export const secretPrompt = async ( title: string ): Promise<string> => {
	return await prompt( title, { method: 'hide' } )
}