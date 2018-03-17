import * as React from 'react';
import Language from '../enum/Language';
import { Component } from 'react';
import MenuLayer from './MenuLayer';
import PageLayer from './PageLayer';

export interface AppState {
    inputLanguage: Language;
    uiLanguage: Language;
}

export default class App extends Component<object, AppState> {

    constructor(props: object) {
        super(props);
        this.state = {
            inputLanguage: Language.ENGLISH, // TODO - use storage provider
            uiLanguage: Language.ENGLISH // TODO - use storage provider
        };
        
        this.onInputLanguageChanged = this.onInputLanguageChanged.bind(this);
        this.onUiLanguageChanged = this.onUiLanguageChanged.bind(this);
    }

    onInputLanguageChanged(value: Language) {
        this.setState({inputLanguage: value});
    }

    onUiLanguageChanged(value: Language) {
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