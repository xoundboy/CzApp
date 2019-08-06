import * as React from 'react';
import { Component } from 'react';
import { TestType } from '../../enum/TestType';
import LexemePair from '../../valueobject/LexemePair';
import LoaderUtil from '../../util/LoaderUtil';
import LexemePairCollectionParser from '../../parsers/LexemePairCollectionParser';
import Language from '../../enum/Language';
import { Familiarity } from '../../enum/Familiarity';

interface ITestProps {
	type: TestType;
	length: number;
	languageToTest: Language;
}

interface ITestState {
	status: TestStatus;
	lexemes: Array<LexemePair>;
	currentIndex: number;
	showButtonClicked: boolean;
}

enum TestStatus {
	notStarted,
	inProgress,
	ended
}

export default class Test extends Component<ITestProps, ITestState> {

	constructor(props: ITestProps) {
		super(props);

		this.state = {
			status: TestStatus.notStarted,
			lexemes: [],
			currentIndex: 0,
			showButtonClicked: false
		};
	}

	componentDidMount(): void {
		this.loadLexemes();
	}

	loadLexemes() {
		const path = `lexemes/${this.props.type}/${this.props.length}`;
		const method = 'GET';

		LoaderUtil.getData(path, method, (json: string) => {
			this.setState({
				lexemes: LexemePairCollectionParser.parse(json[0]),
				status: TestStatus.inProgress
			});
		});
	}

	render() {
		switch (this.state.status) {
			case TestStatus.inProgress:
				console.log(this.state.lexemes);
				return this.renderCurrentLexeme();
			case TestStatus.ended:
				return this.renderResults();
			default:
				return null;
		}
	}

	renderCurrentLexeme() {

		return(
			<div>
				{this.renderQuestionText()}
				{!this.state.showButtonClicked && this.renderRevealButton()}
				{this.state.showButtonClicked && this.renderHiddenSection()}
			</div>
		);
	}

	renderHiddenSection() {
		const answerText = this.props.languageToTest === Language.ENGLISH ?
			this.state.lexemes[this.state.currentIndex].englishLexeme.text :
			this.state.lexemes[this.state.currentIndex].czechLexeme.text;
		return (
			<div className="answerText">
				{answerText}
				{this.renderFamiliarityButtons()}
			</div>
		);
	}

	renderFamiliarityButtons() {
		return(
			<div className="familiarityButtons">
				{this.renderFamiliarityButton(Familiarity.UNKNOWN, 'not even slightly')}
				{this.renderFamiliarityButton(Familiarity.FAMILIAR, 'almost')}
				{this.renderFamiliarityButton(Familiarity.KNOWN, 'got it!')}
			</div>
		);
	}

	renderFamiliarityButton(familiarity: Familiarity, label: string) {
		return (
			<button
				className={familiarity}
				onClick={() => {
					this.markFamiliarity(familiarity);
				}}
			>{label}
			</button>
		);
	}

	markFamiliarity(familiarity: Familiarity) {

		const lexemePair = this.state.lexemes[this.state.currentIndex];
		const czId = lexemePair.czechLexeme.id;
		const enId = lexemePair.englishLexeme.id;

		const path = `lexemePair/${czId}/${enId}/${familiarity}`;
		const method = 'PUT';

		LoaderUtil.getData(path, method, (json: string) => {

			const index = this.state.currentIndex;
			const length = this.state.lexemes.length;
			if (index === (length - 1))
				this.setState({'status': TestStatus.ended});
			else
				this.setState({
					'currentIndex': this.state.currentIndex + 1,
					'showButtonClicked': false
				});
		});
	}

	renderQuestionText() {
		const questionText = this.props.languageToTest === Language.CZECH ?
			this.state.lexemes[this.state.currentIndex].englishLexeme.text :
			this.state.lexemes[this.state.currentIndex].czechLexeme.text;
		return (
			<div className="questionText">
				{questionText}
			</div>
		);
	}

	renderRevealButton() {
		return(<button onClick={() => this.setState({'showButtonClicked': true})}>Reveal</button>);
	}

	renderResults() {
		return(<div>results</div>);
	}
}
