import * as React from 'react';
import { ChangeEvent, Component } from 'react';
import { Redirect } from 'react-router';
import { TestType } from '../../enum/TestType';
import Language from '../../enum/Language';
import { AppContextConsumer, IAppContext } from '../../AppContext';

interface ITestsState {
	type: TestType;
	length: number;
	startClicked: boolean;
	languageToTest: Language;
}

const DEFAULT_TEST_LENGTH = 10;

export default class Tests extends Component<object, ITestsState> {

	context: IAppContext;

	constructor(props: object) {
		super(props);
		this.state = {
			type: TestType.recent,
			length: DEFAULT_TEST_LENGTH,
			startClicked: false,
			// todo - set to the opposite of the add input language once the context is available
			languageToTest: Language.CZECH
		};
	}

	render() {
		return (
			<AppContextConsumer>
				{(context) => {
					this.context = context;
					switch (this.state.startClicked) {
						case false:
							return this.renderIntroForm();
						default:
							return (
								<Redirect
									to={`/test/${this.state.type}/${this.state.length}/${this.state.languageToTest}`}
									push={true}
								/>);
					}
				}}
			</AppContextConsumer>
		);

	}

	renderIntroForm() {
		return (
			<div className="section">
				{this.renderTestType()}
				{this.renderTestLength()}
				{this.renderLanguageToTest()}
				{this.renderStartButton()}
			</div>
		);
	}

	renderLanguageToTest() {
		return (
			<div className="section">
				<div className="sectionLabel">{this.context.dictionary.LANGUAGE_TO_TEST_SELECT_LABEL}</div>
				<select
					value={this.state.languageToTest}
					onChange={(event: ChangeEvent<HTMLSelectElement>) => {
						this.setState({languageToTest: event.target.value as Language});
					}}
				>
					<option value={Language.ENGLISH}>{this.context.dictionary.LANGUAGE_TO_TEST_OPTION_EN}</option>
					<option value={Language.CZECH}>{this.context.dictionary.LANGUAGE_TO_TEST_OPTION_CZ}</option>
				</select>
			</div>
		);
	}

	renderTestType() {
		return (
			<div className="section">
				<div className="sectionLabel">{this.context.dictionary.TEST_TYPE_SELECT_LABEL}</div>
				<select
					value={this.state.type}
					onChange={(event: ChangeEvent<HTMLSelectElement>) => {
						this.setState({type: event.target.value as TestType});
					}}
				>
					<option	value={TestType.recent}>{this.context.dictionary.TEST_TYPE_OPTION_RECENT}</option>
					<option	value={TestType.unknown}>{this.context.dictionary.TEST_TYPE_OPTION_UNKNOWN}</option>
					<option	value={TestType.familiar}>{this.context.dictionary.TEST_TYPE_OPTION_FAMILIAR}</option>
					<option	value={TestType.known}>{this.context.dictionary.TEST_TYPE_OPTION_KNOWN}</option>
					<option	value={TestType.random}>{this.context.dictionary.TEST_TYPE_OPTION_RANDOM}</option>
				</select>
			</div>
		);
	}

	renderTestLength() {
		return(
			<div className="section">
				<div className="sectionLabel">{this.context.dictionary.MAX_TEST_LENGTH_SELECT_LABEL}</div>
				<select
					value={this.state.length}
					onChange={(event: ChangeEvent<HTMLSelectElement>) => {
						this.setState({length: event.target.value as unknown as number});
					}}
				>
					<option value={5}>5</option>
					<option value={10}>10</option>
					<option value={20}>20</option>
				</select>
			</div>
		);
	}

	renderStartButton() {
		return (
			<button className="startButton" onClick={() => this.setState({startClicked: true})}>
				{this.context.dictionary.BUTTON_START_TEST}
			</button>
		);
	}
}
