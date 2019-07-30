import { IAppContext } from '../AppContext';

const backendBaseUrl = process.env.REACT_APP_CZAPP_BACKEND_BASE_URL;

export default class LoaderUtil {

	public static getData(context: IAppContext, path: string, method: string, onSuccess: (json: string) => void): void {
		fetch(
			`${backendBaseUrl}/${path}`,
			{
				method: method,
				mode: 'cors',
				cache: 'no-cache',
				credentials: 'same-origin',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': context.googleAuth.currentUser.get().getAuthResponse().id_token
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
