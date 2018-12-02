import * as React from 'react';
import { Route } from 'react-router';
import Settings from './settings/Settings';
import Add from './add/Add';
import LocalizedComponent, { LocalizedComponentProps } from './generic/LocalizedComponent';
import Language from '../enum/Language';

export interface PageLayerProps extends LocalizedComponentProps {
	inputLanguage: Language;
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
						inputLanguage={this.props.inputLanguage}
						onInputLanguageChanged={this.props.onInputLanguageChanged}
						uiLanguage={this.props.uiLanguage}
						onUiLanguageChanged={this.props.onUiLanguageChanged}
					/> }
				/>
				<Route
					path="/add"
					render={ () => <Add
						uiLanguage={this.props.uiLanguage}
						inputLanguage={this.props.inputLanguage}
					/> }
				/>
			</div>
		);
	}
}