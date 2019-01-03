import * as React from 'react';
import { Component } from 'react';

interface ISignInPageProps {
	onSignInSuccess: (googleUser: gapi.auth2.GoogleUser) => void;
}

export default class SignInPage extends Component<ISignInPageProps> {

	componentDidMount() {
		this.renderGoogleSignInButton();
	}

	renderGoogleSignInButton() {
		gapi.signin2.render('my-signin2', {
			'scope': 'https://www.googleapis.com/auth/plus.login',
			'width': 200,
			'height': 50,
			'longtitle': true,
			'theme': 'dark',
			'onsuccess': this.props.onSignInSuccess
		});
	}

	render() {
		return (
			<div id="my-signin2" />
		);
	}
}
