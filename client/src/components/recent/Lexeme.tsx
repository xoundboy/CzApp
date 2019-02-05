import * as React from 'react';
import { Component } from 'react';
import ILexemeDto from '../../api/ILexemeDto';

interface ILexemeProps {
	data: ILexemeDto;
}

export default class Lexeme extends Component<ILexemeProps> {

	render() {
		return (
			<div>{this.props.data.word}</div>
		);
	}

}