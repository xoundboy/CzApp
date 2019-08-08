import * as React from 'react';
import { ChangeEvent, Component } from 'react';
import { Redirect } from 'react-router';
import { TestType } from '../../enum/TestType';
import Language from '../../enum/Language';

interface ITestsState {
	type: TestType;
	length: number;
	startClicked: boolean;
	languageToTest: Language;
}

const DEFAULT_TEST_LENGTH = 10;

export default class Tests extends Component<object, ITestsState> {

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
				<div className="sectionLabel">Language to test</div>
				<select
					value={this.state.languageToTest}
					onChange={(event: ChangeEvent<HTMLSelectElement>) => {
						this.setState({languageToTest: event.target.value as Language});
					}}
				>
					<option value={Language.ENGLISH}>English</option>
					<option value={Language.CZECH}>Czech</option>
				</select>
			</div>
		);
	}

	renderTestType() {
		return (
			<div className="section">
				<div className="sectionLabel">Test type</div>
				<select
					value={this.state.type}
					onChange={(event: ChangeEvent<HTMLSelectElement>) => {
						this.setState({type: event.target.value as TestType});
					}}
				>
					<option	value={TestType.recent}>Recent</option>
					<option	value={TestType.unknown}>Unknown</option>
					<option	value={TestType.familiar}>Familiar</option>
					<option	value={TestType.known}>Known</option>
					<option	value={TestType.random}>Random</option>
				</select>
			</div>
		);
	}

	renderTestLength() {
		return(
			<div className="section">
				<div className="sectionLabel">Maximum length of test</div>
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
			<button className="startButton" onClick={() => this.setState({startClicked: true})}>Start Test</button>
		);
	}
}
