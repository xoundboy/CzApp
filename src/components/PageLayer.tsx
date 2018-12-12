import * as React from 'react';
import { Route } from 'react-router';
import Settings from './settings/Settings';
import Add from './add/Add';
import LocalizedComponent, { LocalizedComponentProps } from './generic/LocalizedComponent';
import Language from '../enum/Language';
import PageView from '../enum/PageView';

export interface PageLayerProps extends LocalizedComponentProps {
	inputLanguage: Language;
	uiLanguage: Language;
	onUiLanguageChanged: (language: Language) => void;
	onInputLanguageChanged: (language: Language) => void;
}

export default class PageLayer extends LocalizedComponent<PageLayerProps, object> {

	render() {
		return (
			<div className="PageLayer">
				<Route path="/" exact={true}><h1/></Route>
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
					exact={true}
					path="/add"
					render={ () => <Add
						dictionary={this.props.dictionary}
						inputLanguage={this.props.inputLanguage}
						pageView={PageView.LEXEME}
					/> }
				/>
				<Route
					path="/add/lexeme"
					render={ () => <Add
						dictionary={this.props.dictionary}
						inputLanguage={this.props.inputLanguage}
						pageView={PageView.LEXEME}
					/> }
				/>
				<Route
					path="/add/metadata"
					render={ () => <Add
						dictionary={this.props.dictionary}
						inputLanguage={this.props.inputLanguage}
						pageView={PageView.METADATAENTRY}
					/> }
				/>
				<Route
					path="/add/translation"
					render={ () => <Add
						dictionary={this.props.dictionary}
						inputLanguage={this.props.inputLanguage}
						pageView={PageView.TRANSLATION}
					/> }
				/>
				<Route
					path="/add/confirmation"
					render={ () => <Add
						dictionary={this.props.dictionary}
						inputLanguage={this.props.inputLanguage}
						pageView={PageView.CONFIRMATION}
					/> }
				/>
				<Route
					path="/add/note"
					render={ () => <Add
						dictionary={this.props.dictionary}
						inputLanguage={this.props.inputLanguage}
						pageView={PageView.NOTE}
					/> }
				/>
			</div>
		);
	}
}