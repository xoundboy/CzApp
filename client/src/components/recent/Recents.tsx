import * as React from 'react';
import { Component } from 'react';
import { AppContextConsumer, IAppContext } from '../../AppContext';
import ILexemePair from '../../api/ILexemePair';
import LexemePairRow from './LexemePairRow';
import LoaderUtil from '../../util/LoaderUtil';
import LexemePairCollectionParser from '../../parsers/LexemePairCollectionParser';
import EmptyDictionary from '../generic/EmptyDictionary';

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
							{this.state.data.length === 0 ? this.renderNoRecords() : this.renderRecords()}
						</div>);

				}}
			</AppContextConsumer>
		);
	}

	renderTitle() {
		return(<h1>{this.context.dictionary.PAGETITLE_RECENT}</h1>);
	}

	renderNoRecords() {
		return (<EmptyDictionary/>);
	}

	renderRecords() {
		return (
			<div>
				{this.renderTitle()}
				<table>
					<thead>
					<tr>
						<th>{this.context.dictionary.COLUMN_HEADING_ENGLISH}</th>
						<th>{this.context.dictionary.COLUMN_HEADING_CZECH}</th>
					</tr>
					</thead>
					<tbody>
					{this.state.data.map((recent, index) => <LexemePairRow data={recent} key={index} />)}
					</tbody>
				</table>
			</div>
		);
	}

	loadLexemePairs() {
		const path = `lexemes`;
		const method = 'GET';

		LoaderUtil.getData(path, method, (json: string) => {
			this.setState({data: LexemePairCollectionParser.parse(json[0])});
		});
	}
}
