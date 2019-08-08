import * as React from 'react';
import { Component } from 'react';
import { Redirect } from 'react-router';

interface ISplashScreenState {
	addEnglishButtonClicked: boolean;
	addCzechButtonClicked: boolean;
	testButtonClicked: boolean;
}

export default class SplashScreeen extends Component<object, ISplashScreenState> {

	constructor(props: object) {
		super(props);
		this.state = {
			addEnglishButtonClicked: false,
			addCzechButtonClicked: false,
			testButtonClicked: false
		};
	}

	render() {

		if (this.state.addEnglishButtonClicked)
			return (<Redirect to="/add/en" push={true}/>);

		if (this.state.addCzechButtonClicked)
			return (<Redirect to="/add/cz" push={true}/>);

		if (this.state.testButtonClicked)
			return (<Redirect to="/tests" push={true}/>);

		return (
			<div id="splashScreen">
				<div id="middleContainer">
					<div id="appName">CZAPP</div>
					<div id="tagLine">Personal Czech - English training dictionary</div>
					<div className="buttons">
						<button onClick={() => this.setState({addEnglishButtonClicked: true})}>Add English</button>
						<button onClick={() => this.setState({addCzechButtonClicked: true})}>Add Czech</button>
						<button onClick={() => this.setState({testButtonClicked: true})}>Tests</button>
					</div>
				</div>
			</div>);
	}
}
