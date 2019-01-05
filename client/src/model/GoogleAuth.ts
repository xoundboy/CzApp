const GOOGLE_CLIENT_ID = '1076782358657-ek02t3rpa2e7e1kll0pntvl7li7jo827.apps.googleusercontent.com';
const GOOGLE_API_LIBRARY_URL = 'https://apis.google.com/js/platform.js';

export default class GoogleAuth {

	oldAuthStatus: boolean;
	googleAuth: gapi.auth2.GoogleAuth;
	onAuthChangedCallback: (googleAuth: gapi.auth2.GoogleAuth) => void;

	constructor () {
		this.onGapiScriptLoaded = this.onGapiScriptLoaded.bind(this);
		this.onGapiLoaded = this.onGapiLoaded.bind(this);
		this.onAuthInitialised = this.onAuthInitialised.bind(this);
		this.addOnAuthChangedCallback = this.addOnAuthChangedCallback.bind(this);
		this.onIsSignedInChanged = this.onIsSignedInChanged.bind(this);
	}

	public init() {
		const gapiScript = document.createElement('script');
		gapiScript.src = GOOGLE_API_LIBRARY_URL;
		gapiScript.async = true;
		gapiScript.onload = this.onGapiScriptLoaded;
		document.getElementsByTagName('head')[0].appendChild(gapiScript);
	}

	public addOnAuthChangedCallback(callback: (googleAuth: gapi.auth2.GoogleAuth) => void) {
		this.onAuthChangedCallback = callback;
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
		this.onAuthChangedCallback(this.googleAuth);
	}

	onIsSignedInChanged(newAuthStatus: boolean) {
		if (newAuthStatus !== this.oldAuthStatus) {
			this.oldAuthStatus = newAuthStatus;
			this.onAuthChangedCallback(this.googleAuth);
		}
	}
}