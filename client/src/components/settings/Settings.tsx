import * as React from 'react';
import Language from '../../enum/Language';
import { Component } from 'react';
import { AppContextConsumer, IAppContext } from 'AppContext';

export default class Settings extends Component {

	context: IAppContext;

	constructor(props: object) {
		super(props);
		this.onSignOutClicked = this.onSignOutClicked.bind(this);
		this.onRevokeClicked = this.onRevokeClicked.bind(this);
	}

	render() {
		return (
			<AppContextConsumer>
				{(context) => {
					this.context = context;
					return (
						<div className="page settingsPage">
							{this.renderInputLanguage()}
							{this.renderUiLanguage()}
							{this.renderRevokeGoogleAccount()}
							{this.renderSignOutButton()}
						</div>
					);
				}}
			</AppContextConsumer>
		);
	}

	renderRevokeGoogleAccount() {
		return (
			<div className="settingsSection">
				<a
					href="#"
					onClick={this.onRevokeClicked}
				>{this.context.dictionary.LINK_REVOKE_USER_PERMISSIONS}&nbsp;
				{this.context.googleAuth.currentUser.get().getBasicProfile().getEmail()}
				</a>
			</div>
		);
	}

	renderUiLanguage() {
		return (
			<div className="settingsSection">
				<div className="sectionTitle">
					{this.context.dictionary.SETTINGS_SECTION_UI_LANGUAGE}
				</div>
				<div className="radio">
					<label>
						<input
							type="radio"
							value={Language.ENGLISH}
							onChange={this.context.onUiLanguageChanged}
							checked={this.context.uiLanguage === Language.ENGLISH}
						/>
						{this.context.dictionary.SETTINGS_LANGUAGE_OPTION_EN}
					</label>
				</div>

				<div className="radio">
					<label>
						<input
							type="radio"
							value={Language.CZECH}
							onChange={this.context.onUiLanguageChanged}
							checked={this.context.uiLanguage === Language.CZECH}
						/>
						{this.context.dictionary.SETTINGS_LANGUAGE_OPTION_CZ}
					</label>
				</div>
			</div>
		);
	}

	renderInputLanguage() {
		return (
			<div className="settingsSection">
				<div className="sectionTitle">
					{this.context.dictionary.SETTINGS_SECTION_DEFAULT_INPUT_LANG}
				</div>

				<div className="radio">
					<label>
						<input
							type="radio"
							value={Language.ENGLISH}
							onChange={this.context.onInputLanguageChanged}
							checked={this.context.inputLanguage === Language.ENGLISH}
						/>
						{this.context.dictionary.SETTINGS_LANGUAGE_OPTION_EN}</label>
				</div>

				<div className="radio">
					<label>
						<input
							type="radio"
							value={Language.CZECH}
							onChange={this.context.onInputLanguageChanged}
							checked={this.context.inputLanguage === Language.CZECH}
						/>
						{this.context.dictionary.SETTINGS_LANGUAGE_OPTION_CZ}
						</label>
				</div>
			</div>
		);
	}

	renderSignOutButton() {
		return (
			<a href="#" onClick={this.onSignOutClicked}>{this.context.dictionary.LINK_SIGN_OUT}</a>
		);
	}

	onRevokeClicked() {
		this.context.googleAuth.disconnect();
	}

	onSignOutClicked() {
		this.context.googleAuth.signOut();
	}
}