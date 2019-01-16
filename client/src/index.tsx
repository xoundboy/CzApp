import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';
import './style/global.css';
import GoogleAuth from './model/GoogleAuth';
import AppLoadError from './components/AppLoadError';

new GoogleAuth(
	(googleAuth: gapi.auth2.GoogleAuth) =>
		ReactDOM.render(
			<BrowserRouter>
				<App googleAuth={googleAuth}/>
			</BrowserRouter>,
			document.getElementById('root') as HTMLElement
		),
	() =>
		ReactDOM.render(
		<AppLoadError />,
		document.getElementById('root') as HTMLElement
		)).init();
