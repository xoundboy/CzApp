import * as React from 'react';
import { Component } from 'react';
import { IAppContext } from '../../AppContext';

export default abstract class AddLexeme extends Component {

	abstract renderLexemeTextInput(context: IAppContext): React.ReactNode;

	abstract renderNotes(context: IAppContext): React.ReactNode;
}