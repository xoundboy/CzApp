import * as React from 'react';
import './App.css';
import LexemeView from './components/LexemeView';
import PageView from './enum/PageView';
import Language from './enum/Language';
import LangView from './components/LangView';
import TranslationView from './components/TranslationView';
import ConfirmationView from './components/ConfirmationView';
import NoteView from './components/NoteView';

export interface State {
  lexeme: string;
  lexemeLang: Language;
  translation: string;
  translationLang: Language;
  note: string;
  currentView: PageView;
}

export interface Props {}

class App extends React.Component<Props, State> {

  oReq: XMLHttpRequest;

  constructor(props: Props) {
    super(props);
    this.state = {
      lexeme: '',
      translation: '',
      note: '',
      lexemeLang: Language.None,
      translationLang: Language.None,
      currentView: PageView.Input
    };
    this.onLexemeSubmit = this.onLexemeSubmit.bind(this);
    this.onLangClick = this.onLangClick.bind(this);
    this.onTranslationSubmit = this.onTranslationSubmit.bind(this);
    this.onLexemeEdit = this.onLexemeEdit.bind(this);
    this.onTranslationEdit = this.onTranslationEdit.bind(this);
    this.onNotesClicked = this.onNotesClicked.bind(this);
    this.onSwitchLangauges = this.onSwitchLangauges.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onNoteSubmitted = this.onNoteSubmitted.bind(this);
  }

  onLexemeSubmit(input: string) {
    var newView = this.state.lexemeLang === Language.None ? PageView.Language : PageView.Confirmation;
    this.setState({lexeme: input, currentView: newView});
  }

  onLangClick(lang: Language) {
    this.setState({
      lexemeLang: lang,
      translationLang: getTranslationLanguage(lang),
      currentView: PageView.Translation
    });
  }

  onTranslationSubmit(translation: string) {
    this.setState({translation: translation, currentView: PageView.Confirmation});
  }

  onLexemeEdit() {
    this.setState({currentView: PageView.Input});
  }

  onTranslationEdit() {
    this.setState({currentView: PageView.Translation});
  }

  onSwitchLangauges() {
    this.setState({
      lexemeLang: this.state.translationLang,
      translationLang: this.state.lexemeLang
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
      lexeme: '',
      translation: '',
      lexemeLang: Language.None,
      translationLang: Language.None,
      currentView: PageView.Input,
      note: ''
    });
  }

  onSave() {
    this.oReq = new XMLHttpRequest();
    this.oReq.open('POST', 'http://localhost:3002/words');
    this.oReq.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    this.oReq.addEventListener('load', this.onSaveCompleted);
    var params = 'english=' + this.state.lexeme + '&czech=' + this.state.translation + '&note=' + this.state.note;
    this.oReq.send(params);
    return false;
  }

  onSaveCompleted () {
    console.log('hello');
  }

  render() {
    switch (this.state.currentView) {

      case PageView.Input:
        return (
          <div className="page">
            <LexemeView
              lexeme={this.state.lexeme}
              lexemeLang={this.state.lexemeLang}
              onSubmit={this.onLexemeSubmit}
            />
          </div>
        );

      case PageView.Language:
        return (
          <div className="page">
            <LangView input={this.state.lexeme} onLangClick={this.onLangClick} />
          </div>
        );

      case PageView.Translation:
        return (
          <div className="page">
            <TranslationView
              lexeme={this.state.lexeme}
              lexemeLang={this.state.lexemeLang}
              translation={this.state.translation}
              translationLang={this.state.translationLang}
              onSubmit={this.onTranslationSubmit}
            />
          </div>
        );

      case PageView.Confirmation:
        return (
          <div className="page">
            <ConfirmationView
              input={this.state.lexeme}
              inputLang={this.state.lexemeLang}
              translation={this.state.translation}
              translationLang={this.state.translationLang}
              note={this.state.note}
              onInputEdit={this.onLexemeEdit}
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
              input={this.state.lexeme}
              inputLang={this.state.lexemeLang}
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
