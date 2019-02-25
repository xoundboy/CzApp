import * as React from 'react';
import { Component } from 'react';
import { AppContextConsumer, IAppContext } from '../../AppContext';
import ILexemePair from '../../api/ILexemePair';
import { Redirect } from 'react-router';

interface ILexemePairProps {
	data: ILexemePair;
}

interface ILexemePairState {
	selectedIdPair: Array<number>;
}

export default class LexemePairRow extends Component<ILexemePairProps, ILexemePairState> {

	context: IAppContext;

	constructor(props: ILexemePairProps) {
		super(props);
		this.state = {selectedIdPair: null};
		this.onLexemePairClicked = this.onLexemePairClicked.bind(this);
	}

	render() {
		if (this.state.selectedIdPair && this.state.selectedIdPair.length === 2)
			return (
				<Redirect
					push={true}
					to={`/edit/${this.state.selectedIdPair[0]}/${this.state.selectedIdPair[1]}`}
				/>);
		else
			return (
				<AppContextConsumer>
					{(context) => {
						this.context = context;

						return (
							<tr
								onClick={this.onLexemePairClicked}
								data-en_id={this.props.data.englishLexeme.id}
								data-cz_id={this.props.data.czechLexeme.id}
							>
								<td>
									{this.props.data.englishLexeme.text}
								</td>
								<td>
									{this.props.data.czechLexeme.text}
								</td>
							</tr>
						);
					}}
				</AppContextConsumer>);
	}

	onLexemePairClicked(event: React.MouseEvent) {
		const enId = event.currentTarget.attributes['data-en_id'].value;
		const czId = event.currentTarget.attributes['data-cz_id'].value;
		this.setState({selectedIdPair: [czId, enId]});
	}
}