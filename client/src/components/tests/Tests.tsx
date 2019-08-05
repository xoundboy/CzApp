import * as React from 'react';
import { Component } from 'react';
import { ChangeEvent } from 'react';
import { Redirect } from 'react-router';
import { TestType } from '../../enum/TestType';

interface ITestsState {
	type: TestType;
	length: number;
	startClicked: boolean;
}

const DEFAULT_TEST_LENGTH = 10;

export default class Tests extends Component<object, ITestsState> {

	constructor(props: object) {
		super(props);
		this.state = {
			type: TestType.recent,
			length: DEFAULT_TEST_LENGTH,
			startClicked: false
		};

		this.onTestTypeChanged = this.onTestTypeChanged.bind(this);
	}

	render() {
		switch (this.state.startClicked) {
			case false:
				return this.renderIntroForm();
			default:
				return (
					<Redirect
						to={`/test/${this.state.type}/${this.state.length}`}
						push={true}
					/>);
		}
	}

	renderIntroForm() {
		return (
			<div>
				{this.renderTestType()}
				{this.renderTestLength()}
				{this.renderStartButton()}
			</div>
		);
	}

	renderTestType() {
		return (
			<div>
				<div>Test type</div>
				<select
					onChange={this.onTestTypeChanged}
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
			<div>
				<div>Length</div>
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
			<button onClick={() => this.setState({startClicked: true})}>Start</button>
		);
	}

	onTestTypeChanged(event: ChangeEvent<HTMLSelectElement>) {
		const type = event.target.value as TestType;
		this.setState({type: type});
	}
}
