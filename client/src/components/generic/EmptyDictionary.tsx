import { Component } from 'react';
import { AppContextConsumer } from '../../AppContext';
import * as React from 'react';
import { Redirect } from 'react-router';

interface IEmptyDictionaryState {
	addEnglishButtonClicked: boolean;
	addCzechButtonClicked: boolean;
}

export default class EmptyDictionary extends Component<object, IEmptyDictionaryState> {

	constructor (props: object) {
		super(props);
		this.state = {
			addEnglishButtonClicked: false,
			addCzechButtonClicked: false
		};
	}

	render () {

		if (this.state.addEnglishButtonClicked)
			return (<Redirect to="/add/en" push={true}/>);

		if (this.state.addCzechButtonClicked)
			return (<Redirect to="/add/cz" push={true}/>);

		return (
			<AppContextConsumer>
				{(context) => {
					return (
						<div className="emptyDictionaryAlert">
							<div className="middleContainer">
								<div className="message">{context.dictionary.MESSAGE_DICTIONARY_EMPTY}</div>
								<div className="buttons">
									<button onClick={() => this.setState({addEnglishButtonClicked: true})}>
										{context.dictionary.BUTTON_ADD_ENGLISH}
									</button>
									<button onClick={() => this.setState({addCzechButtonClicked: true})}>
										{context.dictionary.BUTTON_ADD_CZECH}
									</button>
								</div>
							</div>
						</div>);
				}}
			</AppContextConsumer>
		);
	}
}
