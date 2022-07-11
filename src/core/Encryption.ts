import crypto from 'crypto'
import fs from 'fs'
import { DecryptError, EncryptError } from '../errors/EncryptionErrors';
import { ENCRYPTION_ALGO } from './ArgHandler';

////////////////////////////////////////

interface Args {
	sourcePath: string
	destPath: string

	password: string
}

const SALT = 'useless salt'

export namespace Encryption
{
	export const encrypt = async ({ sourcePath, destPath, password }: Args): Promise<string> => {
		return new Promise((resolve, reject) => {
			const input = fs.createReadStream(sourcePath);
			const output = fs.createWriteStream(destPath);

			const key = crypto.scryptSync(password, SALT, 32);
			const initializationVector = crypto.randomBytes(16)

			const cipher = crypto.createCipheriv(ENCRYPTION_ALGO, key, initializationVector);

			input.pipe(cipher).pipe(output);

			output.on('finish', () => resolve(initializationVector.toString('hex')));

			output.on('error', () => reject(new EncryptError()) );
		})
	}

	export const decrypt = async ({ sourcePath, destPath, password, initializationVector }: Args & { initializationVector: string }) => {
		return new Promise((resolve, reject) => {
			const input = fs.createReadStream(sourcePath);
			const output = fs.createWriteStream(destPath);

			const key = crypto.scryptSync(password, SALT, 32);
			const iv = Buffer.from(initializationVector, 'hex')

			const cipher = crypto.createDecipheriv(ENCRYPTION_ALGO, key, iv);

			input.pipe(cipher).pipe(output);

			output.on('finish', () => resolve(true));

			output.on('error', () => reject(new DecryptError()) );
		})
	}
}