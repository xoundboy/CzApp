import * as React from 'react';
import { Component } from 'react';
import { AppContextConsumer, IAppContext } from '../AppContext';
import LoaderUtil from '../util/LoaderUtil';
import { Redirect } from 'react-router';

interface IDeleteState {
	done: boolean;
}

export default class Delete extends Component<object, IDeleteState> {

	context: IAppContext;

	constructor(props: object) {
		super(props);
		this.state = {
			done: false
		};
		this.deleteLexemePair = this.deleteLexemePair.bind(this);
	}

	render() {
		return (
			<AppContextConsumer>
				{(context) => {
					this.context = context;
					return this.state.done ? this.renderRedirect() : this.renderConfirmButton();
				}}
			</AppContextConsumer>
		);
	}

	renderRedirect() {
		return (
			<Redirect to="/recent" />
		);
	}

	renderConfirmButton() {
		return (
			<button onClick={this.deleteLexemePair}>{this.context.dictionary.BUTTON_CONFIRM_DELETE}</button>
		);
	}

	deleteLexemePair() {
		const path = `lexemePair/${this.context.czechLexeme.id}/${this.context.englishLexeme.id}`;
		const method = 'DELETE';

		LoaderUtil.getData(this.context, path, method, (json: string) => {
			this.setState({done: true});
			// todo - handle unhappy path
		});
	}
}
