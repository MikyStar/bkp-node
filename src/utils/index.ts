import { DEFAULT_CREATE_EXTENSION, DEFAULT_EXTRACT_EXTENSION } from "../core/Help"

/**
 * Check if the default extension is present, if so trim it, otherwise append the default extract extension
 */
export const handleExtractExtension = (backupPath: string) : string => {
	const regex = new RegExp(`${DEFAULT_CREATE_EXTENSION}$`);

	if (regex.test(backupPath)) {
		return backupPath.split(DEFAULT_CREATE_EXTENSION)[0]
	}

	return backupPath + DEFAULT_EXTRACT_EXTENSION
}