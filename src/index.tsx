import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';
import './style/global.css';
import GoogleAuth from './model/GoogleAuth';

function renderApp (isSignedIn: boolean) {
	ReactDOM.render(
		<BrowserRouter>
			<App isSignedIn={isSignedIn}/>
		</BrowserRouter>,
		document.getElementById('root') as HTMLElement
	);
}

const gAuth = new GoogleAuth();
gAuth.addOnAuthChangedCallback(renderApp);
gAuth.init();
