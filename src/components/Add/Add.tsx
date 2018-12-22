import * as React from 'react';
import AddEnglish from './AddEnglish';
import AddCzech from './AddCzech';
// import AddConfirm from './AddConfirm';
import AddView from '../../enum/AddView';

// import LexemeUtil from '../../util/LexemeUtil';
// import * as QueryString from 'query-string';
import { Route } from 'react-router';
import EnglishLexeme from '../../valueobject/EnglishLexeme';
import CzechLexeme from '../../valueobject/CzechLexeme';
import MetadataEntryView from './MetadataEntryView';
import { Component } from 'react';
import { AppContextConsumer } from '../../AppContext';

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
			<div className="add">
				{this.renderTabButtons()}
				{this.renderCommonPanel()}
				{this.renderLexemePanel()}
			</div>
		);
	}

	renderCommonPanel() {
		return (
			<MetadataEntryView />
		);
	}

	renderLexemePanel() {
		switch (this.props.view) {
			case AddView.ENGLISH:
				return (
					<AddEnglish />
				);
			case AddView.CZECH:
				return (
					<AddCzech />);
			// case AddView.CONFIRM:
			// 	return (
			// 		<AddConfirm
			// 			dictionary={this.props.dictionary}
			// 			lexeme={this.state.lexeme}
			// 			onLexemeEdit={this.onLexemeEdit}
			// 			onTranslationEdit={this.onTranslationEdit}
			// 			onCancel={this.onCancel}
			// 			onSave={this.onSave}
			// 		/>
			// 	);
			default:
				return null;
		}
	}

	renderTabButtons() {
		return (
			<AppContextConsumer>
				{
					(context) => {
						return (
						<div className="tabButtons">
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
						</div>
						);
					}
				}
			</AppContextConsumer>
		);
	}
}
