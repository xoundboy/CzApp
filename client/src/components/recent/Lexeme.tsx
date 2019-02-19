import * as React from 'react';
import { Component } from 'react';
import { AppContextConsumer, IAppContext } from '../../AppContext';
import ILexemePair from '../../api/ILexemePair';

interface ILexemeProps {
	data: ILexemePair;
}

export default class Lexeme extends Component<ILexemeProps> {

	context: IAppContext;

	render() {
		return (
			<AppContextConsumer>
				{(context) => {
					this.context = context;

					return (
						<tr>
							<td onClick={this.onEnglishLexemeEdited}>{this.props.data.en_text}</td>
							<td onClick={this.onCzechLexemeEdited}>{this.props.data.cz_text}</td>
						</tr>
					);
				}}
			</AppContextConsumer>
		);
	}

	onEnglishLexemeEdited() {
		// this.context.onEnglishLexemeEdited(this.context.englishLexeme.id);
	}

	onCzechLexemeEdited() {
		// this.context.onCzechLexemeEdited(this.context.czechLexeme.id);
	}
}