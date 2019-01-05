import * as React from 'react';
import AddEnglish from './AddEnglish';
import AddCzech from './AddCzech';
import AddView from '../../enum/AddView';
import { Route } from 'react-router';
import EnglishLexeme from '../../valueobject/EnglishLexeme';
import CzechLexeme from '../../valueobject/CzechLexeme';
import { Component } from 'react';
import { AppContextConsumer } from '../../AppContext';
import AddConfirm from './AddConfirm';

interface IAddProps {
	view: AddView;
}

export default class Add extends Component<IAddProps> {

	oReq: XMLHttpRequest;

	constructor(props: IAddProps) {
		super(props);
		this.state = {
			currentView: AddView.ENGLISH,
			englishLexeme: new EnglishLexeme(''),
			czechLexeme: new CzechLexeme(''),
			lexemeType: null,
			wordType: null,
			phraseType: null,
			pairingNotes: null
		};
	}

	render() {
		return (
			<div>
				<div className="add">
					{this.renderLexemePanel()}
				</div>
				{this.renderTabButtons()}
			</div>
		);
	}

	renderLexemePanel() {
		switch (this.props.view) {
			case AddView.ENGLISH:
				return (<AddEnglish />);
			case AddView.CZECH:
				return (<AddCzech />);
			case AddView.CONFIRM:
				return (<AddConfirm />);
			default:
				return null;
		}
	}

	renderTabButtons() {
		// TODO - create NavButton component for these buttons
		return (
			<AppContextConsumer>
				{(context) => <div className="tabButtons">
					<Route
						render={({history}) => (
							<button
								type="button"
								onClick={() => {
									history.push('/add/en');
								}}
							>
								{context.dictionary.TAB_ENGLISH}
							</button>
						)}
					/>
					<Route
						render={({history}) => (
							<button
								type="button"
								onClick={() => {
									history.push('/add/cz');
								}}
							>
								{context.dictionary.TAB_CZECH}
							</button>
						)}
					/>
					<Route
						render={({history}) => (
							<button
								type="button"
								onClick={() => {
									history.push('/add/confirm');
								}}
							>
								{context.dictionary.TAB_CONFIRM}
							</button>
						)}
					/>
				</div>}
			</AppContextConsumer>
		);
	}
}
