import * as React from 'react';

import { default as AddLexeme, AddLexemeProps } from './AddLexeme';

export default class AddEnglish extends AddLexeme<AddLexemeProps> {

	render() {
		return (
			<div className="view addEnglish">
				{this.renderLexemeTextInput()}
				{this.renderNotes()}
			</div>
		);
	}

	constructor(props: AddLexemeProps) {
		super(props);
	}
}
