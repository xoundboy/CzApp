import * as React from 'react';
import Language from '../../enum/Language';
import { Component } from 'react';
import { AppContextConsumer, IAppContext } from 'AppContext';

export default class Settings extends Component {

	constructor(props: object) {
		super(props);
	}

	render() {
		return (
			<AppContextConsumer>
				{(context) => {
					return (
						<div className="page settingsPage">
							{this.renderInputLanguage(context)}
							{this.renderUiLanguage(context)}
						</div>
					);
				}}
			</AppContextConsumer>
		);
	}

	renderUiLanguage(context: IAppContext) {
		return (
			<div className="settingsSection">
				<div className="sectionTitle">
					{context.dictionary.SETTINGS_SECTION_UI_LANGUAGE}
				</div>
				<div className="radio">
					<label>
						<input
							type="radio"
							value={Language.ENGLISH}
							onChange={context.onUiLanguageChanged}
							checked={context.uiLanguage === Language.ENGLISH}
						/>
						{context.dictionary.SETTINGS_LANGUAGE_OPTION_EN}
					</label>
				</div>

				<div className="radio">
					<label>
						<input
							type="radio"
							value={Language.CZECH}
							onChange={context.onUiLanguageChanged}
							checked={context.uiLanguage === Language.CZECH}
						/>
						{context.dictionary.SETTINGS_LANGUAGE_OPTION_CZ}
					</label>
				</div>
			</div>
		);
	}

	renderInputLanguage(context: IAppContext) {
		return (
			<div className="settingsSection">
				<div className="sectionTitle">
					{context.dictionary.SETTINGS_SECTION_DEFAULT_INPUT_LANG}
				</div>

				<div className="radio">
					<label>
						<input
							type="radio"
							value={Language.ENGLISH}
							onChange={context.onInputLanguageChanged}
							checked={context.inputLanguage === Language.ENGLISH}
						/>
						{context.dictionary.SETTINGS_LANGUAGE_OPTION_EN}</label>
				</div>

				<div className="radio">
					<label>
						<input
							type="radio"
							value={Language.CZECH}
							onChange={context.onInputLanguageChanged}
							checked={context.inputLanguage === Language.CZECH}
						/>
						{context.dictionary.SETTINGS_LANGUAGE_OPTION_CZ}
						</label>
				</div>

				<div className="radio">
					<label>
						<input
							type="radio"
							value={Language.NULL}
							onChange={context.onInputLanguageChanged}
							checked={context.inputLanguage === Language.NULL}
						/>
					{context.dictionary.SETTINGS_LANGUAGE_OPTION_NONE}
					</label>
				</div>
			</div>
		);
	}
}