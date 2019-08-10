import * as React from 'react';
import { Link } from 'react-router-dom';
import { Component } from 'react';
import { AppContextConsumer, IAppContext } from 'AppContext';

export interface IMenuLayerState {
	navIsOpen: Boolean;
}

export default class MenuLayer extends Component<object, IMenuLayerState> {

	context: IAppContext;

	constructor(props: object) {
		super(props);
		this.state = {
			navIsOpen: false
		};
		this.toggleVisibility = this.toggleVisibility.bind(this);
	}

	getClassName() {
		return 'menuLayer' + (this.state.navIsOpen ? ' open' : ' closed');
	}

	toggleVisibility() {
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
					this.context = context;
					return (
						<nav className="menuItems">
							{this.renderItem(`/add/${context.inputLanguage}`, context.dictionary.MENULABEL_ADD, true)}
							{this.renderItem('/recent', context.dictionary.MENULABEL_RECENT)}
							{/*{this.renderItem('/search', context.dictionary.MENULABEL_SEARCH)}*/}
							{this.renderItem('/tests', context.dictionary.MENULABEL_TESTS)}
							{this.renderItem('/settings', context.dictionary.MENULABEL_SETTINGS)}
						</nav>
					);
				}}

			</AppContextConsumer>
		);
	}

	renderItem(path: string, label: string, clearLexemePair: boolean = false) {

		if (clearLexemePair)
			return (
				<Link
					to={path}
					onClick={() => {
						this.context.onClearDataButtonClicked();
						this.toggleVisibility();
					}}
				>{label}
				</Link>);

		return (<Link to={path} onClick={this.toggleVisibility}>{label}</Link>);
	}

	renderNavButton() {
		return (<div className="menuButton" onClick={this.toggleVisibility} />);
	}
}
