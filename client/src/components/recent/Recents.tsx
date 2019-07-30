import * as React from 'react';
import { Component } from 'react';
import { AppContextConsumer, IAppContext } from '../../AppContext';
import ILexemePair from '../../api/ILexemePair';
import CzechLexeme from '../../valueobject/CzechLexeme';
import EnglishLexeme from '../../valueobject/EnglishLexeme';
import LexemePair from '../../valueobject/LexemePair';
import LexemePairRow from './LexemePairRow';

const backendBaseUrl = process.env.REACT_APP_CZAPP_BACKEND_BASE_URL;

interface IRecentsState {
	data: Array<ILexemePair>;
}

export default class Recents extends Component<object, IRecentsState> {

	context: IAppContext;

	constructor(props: object) {
		super(props);
		this.fetchData = this.fetchData.bind(this);
		this.state = {
			data: null
		};
	}

	componentDidMount() {
		this.fetchData();
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

	fetchData() {
		const idToken = this.context.googleAuth.currentUser.get().getAuthResponse().id_token;
		fetch(
			`${backendBaseUrl}/lexemes`,
			{
				method: 'GET',
				mode: 'cors',
				cache: 'no-cache',
				credentials: 'same-origin',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': idToken
				},
				redirect: 'follow',
				referrer: 'no-referrer'
			})
			.then((response) => response.json())
			.then((myJson) => {
				if (myJson[0].length > 0)
					this.setState({data: this.parseResponse(myJson[0])});
				else
					throw new Error('no records found');
			});
	}

	/* tslint:disable no-any */
	parseResponse(data: any): Array<ILexemePair> | null {

		try {
			const output: Array<ILexemePair> = [];

			for (const index in data)
				if (data.hasOwnProperty(index))
					output.push(this.parseRecord(data[index]));

			return output;

		} catch (error) {
			return null;
		}
	}

	parseRecord(data: any): ILexemePair | null {

		try {

			const czechLexeme = new CzechLexeme(data.cz_text);
			czechLexeme.notes = data.cz_notes;
			czechLexeme.type = data.cz_type;
			czechLexeme.wordType = data.cz_wordType;
			czechLexeme.phraseType = data.cz_phraseType;
			czechLexeme.id = data.cz_id;
			czechLexeme.dateAdded = data.cz_ts;
			czechLexeme.userId = data.cz_userId;
			czechLexeme.gender = data.cz_gender;
			czechLexeme.verbAspect = data.cz_verbAspect;

			const englishLexeme = new EnglishLexeme(data.en_text);
			englishLexeme.notes = data.en_notes;
			englishLexeme.type = data.en_type;
			englishLexeme.wordType = data.en_wordType;
			englishLexeme.phraseType = data.en_phraseType;
			englishLexeme.id = data.en_id;
			englishLexeme.dateAdded = data.en_ts;
			englishLexeme.userId = data.en_userId;

			const output: ILexemePair = new LexemePair(englishLexeme, czechLexeme);
			output.dateAdded = data.map_dateAdded;
			output.ip = data.map_ip;
			output.notes = data.map_notes;
			output.userId = data.map_userId;

			return output;

		} catch (error) {
			return null;
		}
	}
}
