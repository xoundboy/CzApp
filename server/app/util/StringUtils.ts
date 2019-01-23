export class StringUtils {
	public static formatEnum(str: string) {
		if (str !== null && str !== undefined)
			return str.toUpperCase();
		else
			return '';
	}
}