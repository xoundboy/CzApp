export class StringUtils {
	public static formatEnum(str: string) {
		if (str !== null && str !== undefined && str !== '')
			return str.toUpperCase();
		else
			return 'NULL';
	}
}