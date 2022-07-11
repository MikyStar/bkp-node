import crypto from 'crypto'
import fs from 'fs'
import { DecryptError, EncryptError } from '../errors/EncryptionErrors';
import { EncryptionAlgo } from "./ArgHandler"
import { printMessage } from './Printer';

////////////////////////////////////////

interface Args {
	sourcePath: string
	destPath: string

	algo: EncryptionAlgo

	password: string
}

const SALT = 'useless salt'

export namespace Encryption
{
	export const encrypt = async ({ sourcePath, destPath, algo, password }: Args): Promise<string> => {
		return new Promise((resolve, reject) => {
			const input = fs.createReadStream(sourcePath);
			const output = fs.createWriteStream(destPath);

			const key = crypto.scryptSync(password, SALT, 32);
			const initializationVector = crypto.randomBytes(16)

			const cipher = crypto.createCipheriv(algo, key, initializationVector);

			input.pipe(cipher).pipe(output);

			output.on('finish', () => resolve(initializationVector.toString('hex')));

			output.on('error', () => reject(new EncryptError()) );
		})
	}

	export const decrypt = async ({ sourcePath, destPath, algo, password, initializationVector }: Args & { initializationVector: string }) => {
		return new Promise((resolve, reject) => {
			const input = fs.createReadStream(sourcePath);
			const output = fs.createWriteStream(destPath);

			const key = crypto.scryptSync(password, SALT, 32);

			const cipher = crypto.createDecipheriv(algo, key, initializationVector);

			input.pipe(cipher).pipe(output);

			output.on('finish', () => resolve(true));

			output.on('error', () => reject(new DecryptError()) );
		})
	}
}