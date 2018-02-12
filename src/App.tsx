import * as React from 'react';
import './App.css';
import InputView from './components/InputView';
import PageView from './enum/PageView';
import Language from './enum/Language';
import LangView from './components/LangView';
import TranslationView from './components/TranslationView';
import ConfirmationView from './components/ConfirmationView';
import NoteView from './components/NoteView';

export interface State {
  input: string;
  inputLang: Language;
  translation: string;
  translationLang: Language;
  note: string;
  currentView: PageView;
}

export interface Props {}

class App extends React.Component<Props, State> {
  
  constructor(props: Props) {
    super(props);
    this.state = {
      input: '', 
      translation: '', 
      note: '',
      inputLang: Language.None, 
      translationLang: Language.None,
      currentView: PageView.Input
    };
    this.onInputSubmit = this.onInputSubmit.bind(this);
    this.onLangClick = this.onLangClick.bind(this);
    this.onTranslationSubmit = this.onTranslationSubmit.bind(this);
    this.onInputEdit = this.onInputEdit.bind(this);
    this.onTranslationEdit = this.onTranslationEdit.bind(this);
    this.onNotesClicked = this.onNotesClicked.bind(this);
    this.onSwitchLangauges = this.onSwitchLangauges.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onNoteSubmitted = this.onNoteSubmitted.bind(this);
  }

  onInputSubmit(input: string) {
    var newView = this.state.inputLang === Language.None ? PageView.Language : PageView.Confirmation;
    this.setState({input: input, currentView: newView});
  }

  onLangClick(lang: Language) {
    this.setState({
      inputLang: lang,
      translationLang: getTranslationLanguage(lang),
      currentView: PageView.Translation
    });
  }

  onTranslationSubmit(translation: string) {
    this.setState({translation: translation, currentView: PageView.Confirmation});
  }

  onInputEdit() {
    this.setState({currentView: PageView.Input});
  }

  onTranslationEdit() {
    this.setState({currentView: PageView.Translation});
  }

  onSwitchLangauges() {
    this.setState({
      inputLang: this.state.translationLang,
      translationLang: this.state.inputLang
    });
  }

  onNotesClicked() {
    this.setState({currentView: PageView.Note});
  }

  onNoteSubmitted(note: string) {
    this.setState({
      currentView: PageView.Confirmation,
      note: note
    });
  }

  onCancel() {
    this.setState({
      input: '', 
      translation: '', 
      inputLang: Language.None, 
      translationLang: Language.None,
      currentView: PageView.Input,
      note: ''
    });
  }

  onSave() {
    console.log('Saving... ');
    console.log(this.state);
  }

  render() {
    switch (this.state.currentView) {

      case PageView.Input:
        return (
          <div className="page">
            <InputView 
              input={this.state.input}
              inputLang={this.state.inputLang}
              onInputSubmit={this.onInputSubmit} 
            />
          </div>
        );

      case PageView.Language:
        return (
          <div className="page">
            <LangView input={this.state.input} onLangClick={this.onLangClick} />
          </div>
        );

      case PageView.Translation:
        return (
          <div className="page">
            <TranslationView 
              input={this.state.input} 
              inputLang={this.state.inputLang}
              translation={this.state.translation}
              translationLang={this.state.translationLang}
              onTranslationSubmit={this.onTranslationSubmit} 
            />
          </div>
        );

      case PageView.Confirmation:
        return (
          <div className="page">
            <ConfirmationView
              input={this.state.input}
              inputLang={this.state.inputLang}
              translation={this.state.translation}
              translationLang={this.state.translationLang}
              note={this.state.note}
              onInputEdit={this.onInputEdit}
              onTranslationEdit={this.onTranslationEdit}
              onNotesClicked={this.onNotesClicked}
              onCancel={this.onCancel}
              onSave={this.onSave}
              onSwitchLanguages={this.onSwitchLangauges}
            />
          </div>
        );

      case PageView.Note:
        return (          
          <div className="page">
            <NoteView
              input={this.state.input}
              inputLang={this.state.inputLang}
              translation={this.state.translation}
              translationLang={this.state.translationLang}
              note={this.state.note}
              onNoteSubmitted={this.onNoteSubmitted}
            />
          </div>
      );

      default:
        return null;
    }

  }
}

function getTranslationLanguage(inputLang: Language): Language {
  if (inputLang === Language.English) {
    return Language.Czech;
  }
  if (inputLang === Language.Czech) {
    return Language.English;
  }
  return Language.None;
}

export default App;
