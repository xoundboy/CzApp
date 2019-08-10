import * as React from 'react';
import { Component } from 'react';
import { TestType } from '../../enum/TestType';
import LexemePair from '../../valueobject/LexemePair';
import LoaderUtil from '../../util/LoaderUtil';
import LexemePairCollectionParser from '../../parsers/LexemePairCollectionParser';
import Language from '../../enum/Language';
import { Familiarity } from '../../enum/Familiarity';
import { AppContextConsumer, IAppContext } from '../../AppContext';
import EmptyDictionary from '../generic/EmptyDictionary';
import Results from './Results';

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

export enum Progress {
	worse,
	none,
	improved
}

enum TestStatus {
	notStarted,
	inProgress,
	ended,
	emptyDictionary
}

export class Result {
	lexemePair: LexemePair;
	progress: Progress;
	constructor(lexemePair: LexemePair, progress: Progress) {
		this.lexemePair = lexemePair;
		this.progress = progress;
	}
}

export default class Test extends Component<ITestProps, ITestState> {

	context: IAppContext;
	results: Array<Result> = [];

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
			const lexemes = LexemePairCollectionParser.parse(json[0]);
			const status = (lexemes.length > 0) ? TestStatus.inProgress : TestStatus.emptyDictionary;
			this.setState({lexemes: lexemes, status: status});
		});
	}

	render() {
		return (
			<AppContextConsumer>
				{(context) => {
					this.context = context;
					switch (this.state.status) {

						case TestStatus.inProgress:
							return this.renderCurrentLexeme();

						case TestStatus.ended:
							return this.renderResults();

						case TestStatus.emptyDictionary:
							return this.renderEmptyDictionary();

						default:
							return null;
					}
				}}
			</AppContextConsumer>);
	}

	renderEmptyDictionary() {
		return (<EmptyDictionary/>);
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

		const language = this.props.languageToTest === Language.ENGLISH ? Language.ENGLISH : Language.CZECH;

		return (
			<div className="answerText">
				{this.renderLanguageIdentifier(language)}
				{answerText}
				{this.renderFamiliarityButtons()}
			</div>
		);
	}

	renderFamiliarityButtons() {
		return(
			<div className="familiarityButtons">
				{this.renderFamiliarityButton(Familiarity.UNKNOWN, this.context.dictionary.BUTTON_RATE_AS_UNKNOWN)}
				{this.renderFamiliarityButton(Familiarity.FAMILIAR, this.context.dictionary.BUTTON_RATE_AS_FAMILIAR)}
				{this.renderFamiliarityButton(Familiarity.KNOWN, this.context.dictionary.BUTTON_RATE_AS_KNOWN)}
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

		this.results.push(new Result(lexemePair, this.hasImproved(lexemePair.familiarity, familiarity)));
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

	hasImproved(before: Familiarity, after: Familiarity): Progress {

		switch (before) {
			case Familiarity.UNKNOWN:
				return (after !== Familiarity.UNKNOWN) ? Progress.improved : Progress.none;

			case Familiarity.FAMILIAR:
				switch (after) {
					case Familiarity.UNKNOWN:
						return Progress.worse;
					case Familiarity.FAMILIAR:
						return Progress.none;
					default:
						return Progress.improved;
				}

			default:
				return (after !== Familiarity.KNOWN) ? Progress.worse : Progress.none;
		}
	}

	renderQuestionText() {
		const questionText = this.props.languageToTest === Language.CZECH ?
			this.state.lexemes[this.state.currentIndex].englishLexeme.text :
			this.state.lexemes[this.state.currentIndex].czechLexeme.text;

		const language = this.props.languageToTest === Language.ENGLISH ? Language.CZECH : Language.ENGLISH;

		return (
			<div className="questionText">
				{this.renderLanguageIdentifier(language)}
				{questionText}
			</div>
		);
	}

	renderRevealButton() {
		return(
			<button onClick={() => this.setState({'showButtonClicked': true})}>
				{this.context.dictionary.BUTTON_REVEAL_ANSWER}
			</button>);
	}

	renderResults() {
		return(<Results data={this.results} />);
	}

	renderLanguageIdentifier(language: Language) {
		return <div className={`languageIdentifier ${language}`} />;
	}
}
