import * as React from 'react';
import { Link } from 'react-router-dom';
import { Component } from 'react';
import { AppContextConsumer } from 'AppContext';

export interface IMenuLayerState {
	navIsOpen: Boolean;
}

export default class MenuLayer extends Component<object, IMenuLayerState> {

	constructor(props: object) {
		super(props);
		this.state = {
			navIsOpen: false
		};
		this.onMenuVisibilityChanged = this.onMenuVisibilityChanged.bind(this);
	}

	onMenuVisibilityChanged() {
		this.setState({navIsOpen: !this.state.navIsOpen});
	}

	render() {
		return this.state.navIsOpen ? this.renderNavOpen() : this.renderNavButton();
	}

	renderNavOpen() {

		return (
			<AppContextConsumer>
				{(context) => {
					return (
						<div>
							{this.renderNavButton()}
							<div className="menuLayer">
								<nav>
									<Link
										to="/"
										onClick={this.onMenuVisibilityChanged}
									>{context.dictionary.MENULABEL_HOME}
									</Link>

									<Link
										to="/settings"
										onClick={this.onMenuVisibilityChanged}
									>{context.dictionary.MENULABEL_SETTINGS}
									</Link>

									<Link
										to={`/add/${context.inputLanguage}`}
										onClick={this.onMenuVisibilityChanged}
									>{context.dictionary.MENULABEL_ADD}
									</Link>

									<Link
										to="/tests"
										onClick={this.onMenuVisibilityChanged}
									>{context.dictionary.MENULABEL_TESTS}
									</Link>

									<Link
										to="/search"
										onClick={this.onMenuVisibilityChanged}
									>{context.dictionary.MENULABEL_SEARCH}
									</Link>

									<Link
										to="/recent"
										onClick={this.onMenuVisibilityChanged}
									>{context.dictionary.MENULABEL_RECENT}
									</Link>
								</nav>
							</div>
						</div>
					);

				}}

			</AppContextConsumer>
		);
	}

	renderNavButton() {
		return (<div className="menuButton" onClick={this.onMenuVisibilityChanged} />);
	}
}