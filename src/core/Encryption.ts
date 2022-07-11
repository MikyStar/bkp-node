import crypto from 'crypto'
import fs from 'fs'
import { DecryptError, EncryptError } from '../errors/EncryptionErrors';
import { ArchiveAlgo, EncryptionAlgo } from "./ArgHandler"

////////////////////////////////////////

export interface Args {
	sourcePath: string
	destPath: string

	algo: EncryptionAlgo

	password: string
}

export namespace Encryption
{
	export const encrypt = async ({ sourcePath, destPath, algo, password }: Args) => {
		const cipher = crypto.createCipher('aes-256-cbc', password);
		const input = fs.createReadStream(sourcePath);
		const output = fs.createWriteStream(destPath);

		input.pipe(cipher).pipe(output);

		output.on('finish', () => { return; });

		output.on('error', () => { throw new EncryptError() });
	}

	export const decrypt = async ({ sourcePath, destPath, algo, password }: Args) => {
		const cipher = crypto.createDecipher('aes-256-cbc', password);
		const input = fs.createReadStream(sourcePath);
		const output = fs.createWriteStream(destPath);

		input.pipe(cipher).pipe(output);

		output.on('finish', () => { return; });

		output.on('error', () => { throw new DecryptError() });
	}
}