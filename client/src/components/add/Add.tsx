import * as React from 'react';
import AddEnglish from './AddEnglish';
import AddCzech from './AddCzech';
import AddView from '../../enum/AddView';
import EnglishLexeme from '../../valueobject/EnglishLexeme';
import CzechLexeme from '../../valueobject/CzechLexeme';
import { Component } from 'react';
import { AppContextConsumer, IAppContext } from '../../AppContext';
import AddConfirm from './AddConfirm';
import NavButton from '../NavButton';

export interface IAddProps {
	view: AddView;
}

export default class Add<TProps extends IAddProps> extends Component<TProps> {

	context: IAppContext;

	constructor(props: TProps) {
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
			<AppContextConsumer>
				{(context) => {
					this.context = context;
					return (
						<div className="addPageContainer">
							<div className="add">
								{this.renderLexemePanel()}
							</div>
							{this.renderTabButtons()}
						</div>
					);
				}}
			</AppContextConsumer>
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

	getLanguageButtonClassName(textPopulated: boolean) {
		return textPopulated ? 'filled' : 'empty';
	}

	renderTabButtons() {
		return (

			<div className="tabButtons">

				<NavButton
					additionalClasses={this.getLanguageButtonClassName(!!this.context.englishLexeme.text)}
					targetPath="/add/en"
					label={this.context.dictionary.TAB_ENGLISH}
				/>

				<NavButton
					additionalClasses={this.getLanguageButtonClassName(!!this.context.czechLexeme.text)}
					targetPath="/add/cz"
					label={this.context.dictionary.TAB_CZECH}
				/>

				<NavButton
					additionalClasses="confirm"
					targetPath="/add/confirm"
					label={this.context.dictionary.TAB_CONFIRM}
					disabled={!this.context.czechLexeme.text || !this.context.englishLexeme.text}
				/>

				<button onClick={this.context.onClearDataButtonClicked}>{this.context.dictionary.BUTTON_CLEAR}</button>
			</div>
		);
	}
}
