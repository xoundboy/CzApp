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
import * as QueryString from 'query-string'; 

export interface AddState {
  currentView: PageView;
  lexeme: Lexeme;
}

export default class Add extends React.Component<object, AddState> {

  oReq: XMLHttpRequest;

  constructor(props: object) {
    super(props);
    this.state = {
      currentView: PageView.LEXEME,
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
    var newView = this.state.lexeme.language === Language.NONE 
      ? PageView.METADATAENTRY : PageView.CONFIRMATION;

    lexeme.type = LexemeUtil.getLexemeType(lexeme.text);
    this.setState({lexeme: lexeme, currentView: newView});
  }

  onMetadataSubmitted(lexeme: Lexeme) {
    this.setState({lexeme: lexeme, currentView: PageView.TRANSLATION});
  }

  onTranslationSubmit(lexeme: Lexeme) {
    this.setState({lexeme: lexeme, currentView: PageView.CONFIRMATION});
  }
 
  onLexemeEdit(lexeme: Lexeme) {
    this.setState({currentView: PageView.LEXEME});
  }

  onTranslationEdit(lexeme: Lexeme) {
    this.setState({currentView: PageView.TRANSLATION});
  }
 
  onNotesClicked(lexeme: Lexeme) {
    this.setState({currentView: PageView.NOTE});
  }

  onNoteSubmitted(lexeme: Lexeme) {
    this.setState({lexeme: lexeme, currentView: PageView.CONFIRMATION});
  }

  onCancel() {
    this.setState({
      lexeme: new Lexeme,
      currentView: PageView.LEXEME
    });
  }

  onSave(lexeme: Lexeme) {
    this.oReq = new XMLHttpRequest();
    this.oReq.open('POST', 'http://localhost:3002/lexemes');
    this.oReq.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    this.oReq.addEventListener('load', this.onSaveCompleted);
    this.oReq.send(QueryString.stringify(this.state.lexeme));
    return false;
  }

  onSaveCompleted () {
    console.log('save completed');
    this.oReq = null;
  }

  render() {
    switch (this.state.currentView) {

      case PageView.LEXEME:
        return (
          <div className="page">
            <LexemeView
              lexeme={this.state.lexeme}
              onSubmit={this.onLexemeSubmitted}
            />
          </div>
        );

      case PageView.METADATAENTRY:
        return (
          <div className="page">
            <MetadataEntryView 
              lexeme={this.state.lexeme} 
              onSubmit={this.onMetadataSubmitted} 
            />
          </div>
        );

      case PageView.TRANSLATION:
        return (
          <div className="page">
            <TranslationView
              lexeme={this.state.lexeme}
              onSubmit={this.onTranslationSubmit}
            />
          </div>
        );

      case PageView.CONFIRMATION:
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

      case PageView.NOTE:
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