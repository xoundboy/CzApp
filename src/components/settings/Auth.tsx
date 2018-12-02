import * as React from 'react';
import { Component } from 'react';

export default class Auth extends Component<object, object> {

	constructor(props: object) {
		super(props);
		this.onSignIn = this.onSignIn.bind(this);
		this.onSignOut = this.onSignOut.bind(this);
	}

	onSignIn() {
		// TODO
	}

	onSignOut() {
		// TODO
	}

	renderDebug() {
		return (
			<div>
				<h1>DEBUG</h1>
			</div>
		);
	}

	render() {
		return (
			<div>
				<div
					className="g-signin2"
					data-onsuccess={this.onSignIn}
					data-theme="dark"
				/>
				<a href="#" onClick={this.onSignOut}>Sign out</a>
				{this.renderDebug()}
			</div>
		);
	}
}