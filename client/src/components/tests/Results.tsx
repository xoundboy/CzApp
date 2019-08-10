import * as React from 'react';
import { Component } from 'react';
import IDictionary from '../../api/IDictionary';
import { AppContextConsumer } from '../../AppContext';
import { Progress, Result } from './Test';
import { Redirect } from 'react-router';

interface IResultsProps {
	data: Array<Result>;
}

interface IResultsState {
	backToTestsButtonClicked: boolean;
}

export default class Results extends Component<IResultsProps, IResultsState> {

	dictionary: IDictionary;

	constructor(props: IResultsProps) {
		super(props);
		this.state = {backToTestsButtonClicked: false};
	}

	render() {

		if (this.state.backToTestsButtonClicked)
			return <Redirect to="/tests" push={true} />;

		return (
			<AppContextConsumer>
				{(context) => {
					this.dictionary = context.dictionary;
					return (
						<div>
							{this.renderTitle()}
							{this.renderSummary()}
							{this.renderBackToTestsButton()}
						</div>
					);
				}}
			</AppContextConsumer>);
	}

	renderTitle() {
		return (<div>{this.dictionary.RESULTS_SUMMARY_TITLE}</div>);
	}

	renderSummary() {
		const stats = this.getStats();
		return (
			<div className="summary">
				<div className="summaryItem">{this.dictionary.RESULTS_SUMMARY_ITEM_IMPROVED}: {stats.improved}</div>
				<div className="summaryItem">{this.dictionary.RESULTS_SUMMARY_ITEM_NO_PROGRESS}: {stats.noProgress}</div>
				<div className="summaryItem">{this.dictionary.RESULTS_SUMMARY_ITEM_WORSE}: {stats.worse}</div>
			</div>
		);
	}

	getStats(): IResultStats {

		let worse = 0;
		let noProgress = 0;
		let improved = 0;

		this.props.data.forEach((item) => {
			switch (item.progress) {
				case Progress.worse:
					worse++;
					break;

				case Progress.improved:
					improved++;
					break;

				default:
					noProgress++;
			}
		});

		return {
			worse: worse,
			noProgress: noProgress,
			improved: improved
		} as IResultStats;
	}

	renderBackToTestsButton() {
		return (
			<button onClick={() => this.setState({backToTestsButtonClicked: true})}>
				{this.dictionary.BUTTON_BACK_TO_TESTS}
			</button>
		);
	}
}

interface IResultStats {
	worse: number;
	noProgress: number;
	improved: number;
}
