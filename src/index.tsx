import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';
import './style/global.css';
import GoogleAuth = gapi.auth2.GoogleAuth;

const gapiScript = document.createElement('script');
gapiScript.async = true;
gapiScript.onload = onGapiScriptLoaded;

gapiScript.src = 'https://apis.google.com/js/platform.js';
document.getElementsByTagName('head')[0].appendChild(gapiScript);

function renderApp (authStatus: boolean) {
	ReactDOM.render(
		<BrowserRouter>
			<App isSignedIn={authStatus}/>
		</BrowserRouter>,
		document.getElementById('root') as HTMLElement
	);
}

function onAuthInitialised(googleAuth: GoogleAuth) {

	let authStatus = googleAuth.isSignedIn.get();
	googleAuth.isSignedIn.listen(function(newAuthStatus: boolean) {
		if (newAuthStatus !== authStatus) {
			authStatus = newAuthStatus;
			renderApp(newAuthStatus);
		}
	});

	renderApp(authStatus);
}

function onGapiLoaded() {
	const params = {client_id: '1076782358657-ek02t3rpa2e7e1kll0pntvl7li7jo827.apps.googleusercontent.com'};
	gapi.auth2.init(params).then(onAuthInitialised);
}

function onGapiScriptLoaded() {
	gapi.load('auth2', onGapiLoaded);
}