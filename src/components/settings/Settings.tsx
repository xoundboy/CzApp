import * as React from 'react';
import { Component } from 'react';
import Language from '../../enum/Language';
import { ChangeEvent } from 'react';

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

export default class Settings extends Component<SettingsProps, SettingsState> {

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
        <div className="sectionTitle">UI language</div>

        <div className="radio">
          <label>
            <input 
              type="radio" 
              value={Language.ENGLISH}
              onChange={this.onUiLanguageChanged}
              checked={this.state.uiLanguage === Language.ENGLISH} 
            />
            English
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
            Czech
          </label>
        </div>
      </div>
    );
  }

  renderInputLanguage() {
    return (
      <div className="settingsSection">
        <div className="sectionTitle">Default Input Language (which language are you learning?)</div>

        <div className="radio">
          <label>
            <input 
              type="radio" 
              value={Language.ENGLISH}
              onChange={this.onInputLanguageChanged}
              checked={this.state.selectedInputLanguage === Language.ENGLISH} 
            />
            English
          </label>
        </div>

        <div className="radio">
          <label>
            <input 
              type="radio" 
              value={Language.CZECH}
              onChange={this.onInputLanguageChanged}
              checked={this.state.selectedInputLanguage === Language.CZECH} 
            />
            Czech
          </label>
        </div>

        <div className="radio">
          <label>
            <input 
              type="radio" 
              value={Language.NONE}
              onChange={this.onInputLanguageChanged}
              checked={this.state.selectedInputLanguage === Language.NONE} 
            />
            No default (you will be asked to identify the language when adding a new word or phrase)
          </label>
        </div>
      </div>
    );
  }
}