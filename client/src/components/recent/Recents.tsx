import * as React from 'react';
import { Component } from 'react';
import { AppContextConsumer, IAppContext } from '../../AppContext';
import ILexemePair from '../../api/ILexemePair';
import LexemePairRow from './LexemePairRow';
import LoaderUtil from '../../util/LoaderUtil';
import LexemePairCollectionParser from '../../parsers/LexemePairCollectionParser';

interface IRecentsState {
	data: Array<ILexemePair>;
}

export default class Recents extends Component<object, IRecentsState> {

	context: IAppContext;

	constructor(props: object) {
		super(props);
		this.state = {
			data: null
		};
	}

	componentDidMount() {
		this.loadLexemePairs();
	}

	render() {
		return (
			<AppContextConsumer>
				{(context) => {
					this.context = context;

					if (!this.state.data)
						return null;

					return (
						<div>
							<h1>{context.dictionary.PAGETITLE_RECENT}</h1>
							<table>
								<thead>
									<tr>
										<th>{context.dictionary.COLUMN_HEADING_ENGLISH}</th>
										<th>{context.dictionary.COLUMN_HEADING_CZECH}</th>
									</tr>
								</thead>
								<tbody>
									{this.state.data.map((recent, index) => <LexemePairRow data={recent} key={index} />)}
								</tbody>
							</table>
						</div>
					);
				}}
			</AppContextConsumer>
		);
	}

	loadLexemePairs() {
		const path = `lexemes`;
		const method = 'GET';

		LoaderUtil.getData(this.context, path, method, (json: string) => {
			if (json[0].length > 0)
				this.setState({data: LexemePairCollectionParser.parse(json[0])});
			else
				LoaderUtil.handleError();
		});
	}
}
