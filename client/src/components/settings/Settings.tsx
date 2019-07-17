import * as React from 'react';
import Language from '../../enum/Language';
import { Component } from 'react';
import Store from '../../stores/Store';
import { AppContextConsumer, IAppContext } from '../../AppContext';
import { observer } from 'mobx-react';

interface ISettingsProps {
	store: typeof Store.Type;
}

@observer
export default class Settings extends Component<ISettingsProps, {}> {

	context: IAppContext;

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
				<a href="#" onClick={() => this.context.googleAuth.disconnect()}>
					{this.context.dictionary.LINK_REVOKE_USER_PERMISSIONS}&nbsp;
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
							onChange={(event) => this.context.onUiLanguageChanged(event.target.value as Language)}
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
							onChange={(event) => this.context.onUiLanguageChanged(event.target.value as Language)}
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
							onChange={() => this.props.store.onInputLanguageChanged(Language.ENGLISH)}
							checked={this.props.store.inputLanguage === Language.ENGLISH}
						/>
						{this.context.dictionary.SETTINGS_LANGUAGE_OPTION_EN}</label>
				</div>

				<div className="radio">
					<label>
						<input
							type="radio"
							value={Language.CZECH}
							onChange={() => this.props.store.onInputLanguageChanged(Language.CZECH)}
							checked={this.props.store.inputLanguage === Language.CZECH}
						/>
						{this.context.dictionary.SETTINGS_LANGUAGE_OPTION_CZ}
						</label>
				</div>
			</div>
		);
	}

	renderSignOutButton() {
		return (<a href="#" onClick={() => this.context.googleAuth.signOut()}>{this.context.dictionary.LINK_SIGN_OUT}</a>);
	}
}
