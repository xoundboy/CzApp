import * as React from 'react';
import Language from '../enum/Language';
import { Component } from 'react';
import MenuLayer from './MenuLayer';
import PageLayer from './PageLayer';
import LocalStorage from 'model/LocalStorage';

export interface AppState {
	inputLanguage: Language;
	uiLanguage: Language;
}

export default class App extends Component<object, AppState> {

	constructor(props: object) {
		super(props);
		this.state = {
			inputLanguage: LocalStorage.inputLanguage || Language.ENGLISH,
			uiLanguage: LocalStorage.uiLanguage || Language.ENGLISH
		};

		this.onInputLanguageChanged = this.onInputLanguageChanged.bind(this);
		this.onUiLanguageChanged = this.onUiLanguageChanged.bind(this);
	}

	onInputLanguageChanged(value: Language) {
		LocalStorage.inputLanguage = value;
		this.setState({inputLanguage: value});
	}

	onUiLanguageChanged(value: Language) {
		LocalStorage.uiLanguage = value;
		this.setState({uiLanguage: value});
	}

	render() {
		return (
			<div className={this.constructor.name}>
				<MenuLayer uiLanguage={this.state.uiLanguage}/>
				<PageLayer
					uiLanguage={this.state.uiLanguage}
					inputLanguage={this.state.inputLanguage}
					onInputLanguageChanged={this.onInputLanguageChanged}
					onUiLanguageChanged={this.onUiLanguageChanged}
				/>
			</div>
		);
	}
} 