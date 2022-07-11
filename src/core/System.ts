import fs from "fs";
import path from "path";

import { FileTypeError } from "../errors/FileErrors";

////////////////////////////////////////

export namespace System {
	export const exit = (code = 0) => process.exit(code);

	/**
	 * Returns as is if it's already absolute, otherwise make it absolute
	 */
	export const getAbsolutePath = (filePath: string) =>
		path.isAbsolute(filePath)
			? filePath
			: path.join(process.cwd(), filePath);

	export const doesFileExists = (path: string): boolean =>
		fs.existsSync(getAbsolutePath(path)) || false;

	export const isDirectory = (path: string): boolean => {
		const absPath = getAbsolutePath(path);

		/** fs.lstatSync(absPath) can not be destructured https://github.com/nodejs/help/issues/3713 */

		if (fs.lstatSync(absPath).isDirectory()) return true;

		if (fs.lstatSync(absPath).isFile()) return false;

		throw new FileTypeError(path);
	};

	export const deleteFile = (path: string) => {
		const absPath = getAbsolutePath(path);

		fs.rmSync(absPath)
	}
}
