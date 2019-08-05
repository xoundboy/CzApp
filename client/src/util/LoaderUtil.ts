import StorageUtil from './StorageUtil';
import { LS_AUTH_TOKEN_KEY } from '../index';

const backendBaseUrl = process.env.REACT_APP_CZAPP_BACKEND_BASE_URL;

export default class LoaderUtil {

	public static getData(path: string, method: string, onSuccess: (json: string) => void): void {
		fetch(
			`${backendBaseUrl}/${path}`,
			{
				method: method,
				mode: 'cors',
				cache: 'no-cache',
				credentials: 'same-origin',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': StorageUtil.getItem(LS_AUTH_TOKEN_KEY)
				},
				redirect: 'follow',
				referrer: 'no-referrer'
			})
			.then((response) => response.json())
			.then((json) => onSuccess(json));
	}

	public static handleError() {
		throw new Error('no records found');
	}
}
