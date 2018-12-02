import * as React from 'react';
import Language from '../../enum/Language';
import { ChangeEvent } from 'react';
import LocalizedComponent from '../generic/LocalizedComponent';

export interface SettingsProps {
	inputLanguage: Language;
	onInputLanguageChanged: (language: Language) => void;
	uiLanguage: Language;
	onUiLanguageChanged: (language: Language) => void;
}

export interface SettingsState {
	selectedInputLanguage: Language;
	uiLanguage: Language;
}

export default class Settings extends LocalizedComponent<SettingsProps, SettingsState> {

	constructor(props: SettingsProps) {
		super(props);
		this.state = {
			selectedInputLanguage: this.props.inputLanguage,
			uiLanguage: this.props.uiLanguage
		};
		this.onInputLanguageChanged = this.onInputLanguageChanged.bind(this);
		this.onUiLanguageChanged = this.onUiLanguageChanged.bind(this);
	}

	onInputLanguageChanged(event: ChangeEvent<HTMLInputElement>) {
		const language = event.target.value as Language;
		this.setState({selectedInputLanguage: language});
		this.props.onInputLanguageChanged(language);
	}

	onUiLanguageChanged(event: ChangeEvent<HTMLInputElement>) {
		const language = event.target.value as Language;
		this.setState({uiLanguage: language});
		this.props.onUiLanguageChanged(language);
	}

	render() {
		return (
			<div className="page settingsPage">
				{this.renderInputLanguage()}
				{this.renderUiLanguage()}
			</div>
		);
	}

	renderUiLanguage() {
		return (
			<div className="settingsSection">
				<div className="sectionTitle">
					{this.getCopy('SETTINGS_SECTION_UI_LANGUAGE')}
				</div>
				<div className="radio">
					<label>
						<input
							type="radio"
							value={Language.ENGLISH}
							onChange={this.onUiLanguageChanged}
							checked={this.state.uiLanguage === Language.ENGLISH}
						/>
						{this.getCopy('SETTINGS_LANGUAGE_OPTION_EN')}
					</label>
				</div>

				<div className="radio">
					<label>
						<input
							type="radio"
							value={Language.CZECH}
							onChange={this.onUiLanguageChanged}
							checked={this.state.uiLanguage === Language.CZECH}
						/>
						{this.getCopy('SETTINGS_LANGUAGE_OPTION_CZ')}
					</label>
				</div>
			</div>
		);
	}

	renderInputLanguage() {
		return (
			<div className="settingsSection">
				<div className="sectionTitle">
					{this.getCopy('SETTINGS_SECTION_DEFAULT_INPUT_LANG')}
				</div>

				<div className="radio">
					<label>
						<input
							type="radio"
							value={Language.ENGLISH}
							onChange={this.onInputLanguageChanged}
							checked={this.state.selectedInputLanguage === Language.ENGLISH}
						/>
						{this.getCopy('SETTINGS_LANGUAGE_OPTION_EN')}</label>
				</div>

				<div className="radio">
					<label>
						<input
							type="radio"
							value={Language.CZECH}
							onChange={this.onInputLanguageChanged}
							checked={this.state.selectedInputLanguage === Language.CZECH}
						/>
						{this.getCopy('SETTINGS_LANGUAGE_OPTION_CZ')}
						</label>
				</div>

				<div className="radio">
					<label>
						<input
							type="radio"
							value={Language.NULL}
							onChange={this.onInputLanguageChanged}
							checked={this.state.selectedInputLanguage === Language.NULL}
						/>
					{this.getCopy('SETTINGS_LANGUAGE_OPTION_NONE')}
					</label>
				</div>
			</div>
		);
	}
}