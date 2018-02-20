import * as React from 'react';
import '../../style/App.css';
import LexemeView from './LexemeView';
import PageView from '../../enum/PageView';
import ConfirmationView from './ConfirmationView';
import Gender from '../../enum/Gender';
import LangView from './LangView';
import Language from '../../enum/Language';
import LexemeType from '../../enum/LexemeType';
import NoteView from './NoteView';
import PhraseType from '../../enum/PhraseType';
import TranslationView from './TranslationView';
import WordType from '../../enum/WordType';

export interface State {
  currentView: PageView;
  gender: Gender;
  lexeme: string;
  lexemeLang: Language;
  lexemeType: LexemeType;
  note: string;
  phraseType: PhraseType;
  translation: string;
  translationLang: Language;
  wordType: WordType;
}

export interface Props {}

class Add extends React.Component<Props, State> {

  oReq: XMLHttpRequest;

  constructor(props: Props) {
    super(props);
    this.state = {
      currentView: PageView.Input,
      gender: Gender.None,
      lexeme: '',
      lexemeLang: Language.None,
      lexemeType: LexemeType.None,
      note: '',
      phraseType: PhraseType.None,
      translation: '',
      translationLang: Language.None,
      wordType: WordType.None,
    };
    this.onCancel = this.onCancel.bind(this);
    this.onLangClick = this.onLangClick.bind(this);
    this.onLexemeEdit = this.onLexemeEdit.bind(this);
    this.onLexemeSubmit = this.onLexemeSubmit.bind(this);
    this.onNoteSubmitted = this.onNoteSubmitted.bind(this);
    this.onNotesClicked = this.onNotesClicked.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onSwitchLangauges = this.onSwitchLangauges.bind(this);
    this.onTranslationEdit = this.onTranslationEdit.bind(this);
    this.onTranslationSubmit = this.onTranslationSubmit.bind(this);
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

export default Add;
