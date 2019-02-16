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

	getClassName() {
		return 'menuLayer' + (this.state.navIsOpen ? ' open' : ' closed');
	}

	onMenuVisibilityChanged() {
		this.setState({navIsOpen: !this.state.navIsOpen});
	}

	render() {
		return (
			<div className={this.getClassName()}>
				{this.renderNavButton()}
				{this.state.navIsOpen ? this.renderNavOpen() : null}
			</div>
		);
	}

	renderNavOpen() {

		return (
			<AppContextConsumer>
				{(context) => {
					return (
						<nav className="menuItems">
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
					);
				}}

			</AppContextConsumer>
		);
	}

	renderNavButton() {
		return (<div className="menuButton" onClick={this.onMenuVisibilityChanged} />);
	}
}