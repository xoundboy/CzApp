import * as React from 'react';
import { Link } from 'react-router-dom';
import { Component } from 'react';
import { AppContextConsumer } from '../AppContext';
import Store from '../stores/Store';

export interface IMenuLayerProps {
	store: typeof Store.Type;
}

export interface IMenuLayerState {
	navIsOpen: Boolean;
}

export default class MenuLayer extends Component<IMenuLayerProps, IMenuLayerState> {

	constructor(props: IMenuLayerProps) {
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
							{this.renderItem('/recent', context.dictionary.MENULABEL_RECENT)}
							{this.renderItem(`/add/${context.inputLanguage}`, context.dictionary.MENULABEL_ADD)}
							{this.renderItem('/search', context.dictionary.MENULABEL_SEARCH)}
							{this.renderItem('/tests', context.dictionary.MENULABEL_TESTS)}
							{this.renderItem('/settings', context.dictionary.MENULABEL_SETTINGS)}
						</nav>
					);
				}}

			</AppContextConsumer>
		);
	}

	renderItem(path: string, label: string) {
		return (<Link to={path} onClick={this.onMenuVisibilityChanged}>{label}</Link>);
	}

	renderNavButton() {
		return (<div className="menuButton" onClick={this.onMenuVisibilityChanged} />);
	}
}
