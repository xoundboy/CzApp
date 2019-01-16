const GOOGLE_CLIENT_ID = '1076782358657-ek02t3rpa2e7e1kll0pntvl7li7jo827.apps.googleusercontent.com';
const GOOGLE_API_LIBRARY_URL = 'https://apis.google.com/js/platform.js';

export default class GoogleAuth {

	oldAuthStatus: boolean;
	googleAuth: gapi.auth2.GoogleAuth;
	onSuccess: (googleAuth: gapi.auth2.GoogleAuth) => void;
	onError: () => void;

	constructor (onSuccess: (googleAuth: gapi.auth2.GoogleAuth) => void, onError: () => void) {
		this.onSuccess = onSuccess;
		this.onError = onError;
		this.onGapiScriptLoaded = this.onGapiScriptLoaded.bind(this);
		this.onGapiLoaded = this.onGapiLoaded.bind(this);
		this.onAuthInitialised = this.onAuthInitialised.bind(this);
		this.onIsSignedInChanged = this.onIsSignedInChanged.bind(this);
	}

	public init() {
		const gapiScript = document.createElement('script');
		gapiScript.src = GOOGLE_API_LIBRARY_URL;
		gapiScript.async = true;
		gapiScript.onload = this.onGapiScriptLoaded;
		gapiScript.onerror = this.onError;
		document.getElementsByTagName('head')[0].appendChild(gapiScript);
	}

	onGapiScriptLoaded() {
		gapi.load('auth2', this.onGapiLoaded);
	}

	onGapiLoaded() {
		const params = {client_id: GOOGLE_CLIENT_ID};
		gapi.auth2.init(params).then(this.onAuthInitialised);
	}

	onAuthInitialised(googleAuth: gapi.auth2.GoogleAuth) {
		this.googleAuth = googleAuth;
		this.oldAuthStatus = googleAuth.isSignedIn.get();
		this.googleAuth.isSignedIn.listen(this.onIsSignedInChanged);
		this.onSuccess(this.googleAuth);
	}

	onIsSignedInChanged(newAuthStatus: boolean) {
		if (newAuthStatus !== this.oldAuthStatus) {
			this.oldAuthStatus = newAuthStatus;
			this.onSuccess(this.googleAuth);
		}
	}
}