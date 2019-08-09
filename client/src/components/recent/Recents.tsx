import * as React from 'react';
import { Component } from 'react';
import { AppContextConsumer, IAppContext } from '../../AppContext';
import ILexemePair from '../../api/ILexemePair';
import LexemePairRow from './LexemePairRow';
import LoaderUtil from '../../util/LoaderUtil';
import LexemePairCollectionParser from '../../parsers/LexemePairCollectionParser';
import { Redirect } from 'react-router';

interface IRecentsState {
	data: Array<ILexemePair>;
	addEnglishButtonClicked: boolean;
	addCzechButtonClicked: boolean;
}

export default class Recents extends Component<object, IRecentsState> {

	context: IAppContext;

	constructor(props: object) {
		super(props);
		this.state = {
			addEnglishButtonClicked: false,
			addCzechButtonClicked: false,
			data: null
		};
	}

	componentDidMount() {
		this.loadLexemePairs();
	}

	render() {

		if (this.state.addEnglishButtonClicked)
			return (<Redirect to="/add/en" push={true}/>);

		if (this.state.addCzechButtonClicked)
			return (<Redirect to="/add/cz" push={true}/>);

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
		return (
			<div className="emptyDictionaryAlert">
				<div className="middleContainer">
				<div className="message">Dictionary empty</div>
					<div className="buttons">
						<button onClick={() => this.setState({addEnglishButtonClicked: true})}>Add English</button>
						<button onClick={() => this.setState({addCzechButtonClicked: true})}>Add Czech</button>
					</div>
				</div>
			</div>);
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
