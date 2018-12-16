import * as React from 'react';
import Language from '../../enum/Language';
import { ChangeEvent } from 'react';
import LocalizedComponent from '../generic/LocalizedComponent';
import Dictionary from '../../api/Dictionary';

export interface SettingsProps {
	dictionary: Dictionary;
	inputLanguage: Language;
	onInputLanguageChanged: (language: Language) => void;
	uiLanguage: Language;
	onUiLanguageChanged: (language: Language) => void;
}

export default class Settings extends LocalizedComponent<SettingsProps, object> {

	constructor(props: SettingsProps) {
		super(props);
		this.onInputLanguageChanged = this.onInputLanguageChanged.bind(this);
		this.onUiLanguageChanged = this.onUiLanguageChanged.bind(this);
	}

	onInputLanguageChanged(event: ChangeEvent<HTMLInputElement>) {
		this.props.onInputLanguageChanged(event.target.value as Language);
	}

	onUiLanguageChanged(event: ChangeEvent<HTMLInputElement>) {
		this.props.onUiLanguageChanged(event.target.value as Language);
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
					{this.props.dictionary.SETTINGS_SECTION_UI_LANGUAGE}
				</div>
				<div className="radio">
					<label>
						<input
							type="radio"
							value={Language.ENGLISH}
							onChange={this.onUiLanguageChanged}
							checked={this.props.uiLanguage === Language.ENGLISH}
						/>
						{this.props.dictionary.SETTINGS_LANGUAGE_OPTION_EN}
					</label>
				</div>

				<div className="radio">
					<label>
						<input
							type="radio"
							value={Language.CZECH}
							onChange={this.onUiLanguageChanged}
							checked={this.props.uiLanguage === Language.CZECH}
						/>
						{this.props.dictionary.SETTINGS_LANGUAGE_OPTION_CZ}
					</label>
				</div>
			</div>
		);
	}

	renderInputLanguage() {
		return (
			<div className="settingsSection">
				<div className="sectionTitle">
					{this.props.dictionary.SETTINGS_SECTION_DEFAULT_INPUT_LANG}
				</div>

				<div className="radio">
					<label>
						<input
							type="radio"
							value={Language.ENGLISH}
							onChange={this.onInputLanguageChanged}
							checked={this.props.inputLanguage === Language.ENGLISH}
						/>
						{this.props.dictionary.SETTINGS_LANGUAGE_OPTION_EN}</label>
				</div>

				<div className="radio">
					<label>
						<input
							type="radio"
							value={Language.CZECH}
							onChange={this.onInputLanguageChanged}
							checked={this.props.inputLanguage === Language.CZECH}
						/>
						{this.props.dictionary.SETTINGS_LANGUAGE_OPTION_CZ}
						</label>
				</div>

				<div className="radio">
					<label>
						<input
							type="radio"
							value={Language.NULL}
							onChange={this.onInputLanguageChanged}
							checked={this.props.inputLanguage === Language.NULL}
						/>
					{this.props.dictionary.SETTINGS_LANGUAGE_OPTION_NONE}
					</label>
				</div>
			</div>
		);
	}
}