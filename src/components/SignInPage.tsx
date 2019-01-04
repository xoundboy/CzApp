import * as React from 'react';
import { Component } from 'react';

export default class SignInPage extends Component {

	componentDidMount() {
		this.renderGoogleSignInButton();
	}

	renderGoogleSignInButton() {
		gapi.signin2.render('my-signin2', {
			'scope': 'https://www.googleapis.com/auth/plus.login',
			'width': 200,
			'height': 50,
			'longtitle': true,
			'theme': 'dark'
		});
	}

	render() {
		return (
			<div id="my-signin2" />
		);
	}
}
