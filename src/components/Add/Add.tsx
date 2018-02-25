import * as React from 'react';
import '../../style/App.css';
import LexemeView from './LexemeView';
import PageView from '../../enum/PageView';
import MetadataEntryView from './MetadataEntryView';
import Lexeme from '../../valueobject/Lexeme';
import Language from '../../enum/Language';
import LexemeUtil from '../../util/LexemeUtil';
import TranslationView from './TranslationView';
import ConfirmationView from './ConfirmationView';
import NoteView from './NoteView';

export interface AddState {
  currentView: PageView;
  lexeme: Lexeme;
}

export default class Add extends React.Component<object, AddState> {

  oReq: XMLHttpRequest;

  constructor(props: object) {
    super(props);
    this.state = {
      currentView: PageView.Lexeme,
      lexeme: new Lexeme()
    };
    this.onCancel = this.onCancel.bind(this);
    this.onLexemeEdit = this.onLexemeEdit.bind(this);
    this.onLexemeSubmitted = this.onLexemeSubmitted.bind(this);
    this.onMetadataSubmitted = this.onMetadataSubmitted.bind(this);
    this.onNoteSubmitted = this.onNoteSubmitted.bind(this);
    this.onNotesClicked = this.onNotesClicked.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onTranslationEdit = this.onTranslationEdit.bind(this);
    this.onTranslationSubmit = this.onTranslationSubmit.bind(this);
  }

  onLexemeSubmitted(lexeme: Lexeme) {
    var newView = this.state.lexeme.language === Language.None 
      ? PageView.MetadataEntry : PageView.Confirmation;

    lexeme.type = LexemeUtil.getLexemeType(lexeme.text);
    this.setState({lexeme: lexeme, currentView: newView});
  }

  onMetadataSubmitted(lexeme: Lexeme) {
    this.setState({lexeme: lexeme, currentView: PageView.Translation});
  }

  onTranslationSubmit(lexeme: Lexeme) {
    this.setState({lexeme: lexeme, currentView: PageView.Confirmation});
  }
 
  onLexemeEdit(lexeme: Lexeme) {
    this.setState({currentView: PageView.Lexeme});
  }

  onTranslationEdit(lexeme: Lexeme) {
    this.setState({currentView: PageView.Translation});
  }
 
  onNotesClicked(lexeme: Lexeme) {
    this.setState({currentView: PageView.Note});
  }

  onNoteSubmitted(lexeme: Lexeme) {
    this.setState({lexeme: lexeme, currentView: PageView.Confirmation});
  }

  onCancel() {
    this.setState({
      lexeme: new Lexeme,
      currentView: PageView.Lexeme
    });
  }

  onSave(lexeme: Lexeme) {
    this.oReq = new XMLHttpRequest();
    this.oReq.open('POST', 'http://localhost:3002/words');
    this.oReq.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    this.oReq.addEventListener('load', this.onSaveCompleted);

    var params = 
      'english=' + this.state.lexeme.text + 
      '&czech=' + this.state.lexeme.translation + 
      '&note=' + this.state.lexeme.note;

    this.oReq.send(params);
    return false;
  }

  onSaveCompleted () {
    console.log('hello');
  }

  render() {
    switch (this.state.currentView) {

      case PageView.Lexeme:
        return (
          <div className="page">
            <LexemeView
              lexeme={this.state.lexeme}
              onSubmit={this.onLexemeSubmitted}
            />
          </div>
        );

      case PageView.MetadataEntry:
        return (
          <div className="page">
            <MetadataEntryView 
              lexeme={this.state.lexeme} 
              onSubmit={this.onMetadataSubmitted} 
            />
          </div>
        );

      case PageView.Translation:
        return (
          <div className="page">
            <TranslationView
              lexeme={this.state.lexeme}
              onSubmit={this.onTranslationSubmit}
            />
          </div>
        );

      case PageView.Confirmation:
        return (
          <div className="page">
            <ConfirmationView
              lexeme={this.state.lexeme}
              onLexemeEdit={this.onLexemeEdit}
              onTranslationEdit={this.onTranslationEdit}
              onNotesClicked={this.onNotesClicked}
              onCancel={this.onCancel}
              onSave={this.onSave}
            />
          </div>
        );

      case PageView.Note:
        return (
          <div className="page">
            <NoteView
              lexeme={this.state.lexeme}
              onSubmit={this.onNoteSubmitted}
            />
          </div>
      );

      default:
        return null;
    }
  }
}
