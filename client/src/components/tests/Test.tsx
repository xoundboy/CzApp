import * as React from 'react';
import { Component } from 'react';
import { TestType } from '../../enum/TestType';
import LexemePair from '../../valueobject/LexemePair';
import LoaderUtil from '../../util/LoaderUtil';
import LexemePairCollectionParser from '../../parsers/LexemePairCollectionParser';

interface ITestProps {
	type: TestType;
	length: number;
}

interface ITestState {
	status: TestStatus;
	lexemes: Array<LexemePair>;
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
			lexemes: []
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
		return(<div>current lexeme</div>);
	}

	renderResults() {
		return(<div>results</div>);
	}
}
