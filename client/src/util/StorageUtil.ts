export default class StorageUtil {
	public static getItem(name: string): string {
		return window.localStorage.getItem(name);
	}

	public static setItem(name: string, value: string): void {
		window.localStorage.setItem(name, value);
	}
}
