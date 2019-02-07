import * as React from 'react';
import { Component } from 'react';
import ILexemeDto from '../../api/ILexemeDto';

interface ILexemeProps {
	data: ILexemeDto;
}

export default class Lexeme extends Component<ILexemeProps> {

	render() {
		return (
			<tr>
				<td>{this.props.data.en_word}</td>
				<td>{this.props.data.cz_word}</td>
			</tr>
		);
	}

}