import * as React from 'react';
import LocalizedComponent, { LocalizedComponentProps } from './generic/LocalizedComponent';
import { Link } from 'react-router-dom';

export interface MenuLayerState {
	navIsOpen: Boolean;
}

export default class MenuLayer extends LocalizedComponent<LocalizedComponentProps, MenuLayerState> {

	constructor(props: LocalizedComponentProps) {
		super(props);
		this.state = {
			navIsOpen: false
		};
		this.onNavVisibilityChanged = this.onNavVisibilityChanged.bind(this);
	}

	onNavVisibilityChanged() {
		this.setState({navIsOpen: !this.state.navIsOpen});
	}

	render() {
		return (
			<div className="navLayer">
				{this.state.navIsOpen ? this.renderNavOpen() : this.renderNavButton()}
			</div>
		);
	}

	renderNavOpen() {
		return (
			<div>
				{this.renderNavButton()}
				<div className="view">
					<nav>
						<Link to="/" onClick={this.onNavVisibilityChanged}>
							{this.props.dictionary.MENULABEL_HOME}
						</Link>
						<Link to="/settings" onClick={this.onNavVisibilityChanged} >
							{this.props.dictionary.MENULABEL_SETTINGS}
						</Link>
						<Link to="/add" onClick={this.onNavVisibilityChanged} >
							{this.props.dictionary.MENULABEL_ADD}
						</Link>
					</nav>
				</div>
			</div>
		);
	}

	renderNavButton() {
		return (<div className="navButton" onClick={this.onNavVisibilityChanged} />);
	}
}