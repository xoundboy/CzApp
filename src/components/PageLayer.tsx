import * as React from 'react';
import { Route } from 'react-router';
import Settings from './settings/Settings';
import Add from './add/Add';
import LocalizedComponent, { LocalizedComponentProps } from './generic/LocalizedComponent';
import Language from '../enum/Language';
import AddView from '../enum/AddView';

export interface PageLayerProps extends LocalizedComponentProps {
	inputLanguage: Language;
	uiLanguage: Language;
	onUiLanguageChanged: (language: Language) => void;
	onInputLanguageChanged: (language: Language) => void;
}

export default class PageLayer extends LocalizedComponent<PageLayerProps, object> {

	render() {
		return (
			<div className="pageLayer">
				<Route
					path="/settings"
					render={ () => <Settings
						dictionary={this.props.dictionary}
						inputLanguage={this.props.inputLanguage}
						onInputLanguageChanged={this.props.onInputLanguageChanged}
						uiLanguage={this.props.uiLanguage}
						onUiLanguageChanged={this.props.onUiLanguageChanged}
					/> }
				/>
				<Route
					path="/add/english"
					render={ () => <Add
						dictionary={this.props.dictionary}
						inputLanguage={this.props.inputLanguage}
						view={AddView.ENGLISH}
					/> }
				/>
				<Route
					path="/add/czech"
					render={ () => <Add
						dictionary={this.props.dictionary}
						inputLanguage={this.props.inputLanguage}
						view={AddView.CZECH}
					/> }
				/>
				<Route
					path="/add/confirm"
					render={ () => <Add
						dictionary={this.props.dictionary}
						inputLanguage={this.props.inputLanguage}
						view={AddView.CONFIRM}
					/> }
				/>
			</div>
		);
	}
}