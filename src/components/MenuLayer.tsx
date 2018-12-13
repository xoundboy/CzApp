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
			<div>
				{this.renderNavButton()}
				<div className="menuLayer">
					<nav>
						<Link to="/" onClick={this.onMenuVisibilityChanged}>
							{this.props.dictionary.MENULABEL_HOME}
						</Link>
						<Link to="/settings" onClick={this.onMenuVisibilityChanged} >
							{this.props.dictionary.MENULABEL_SETTINGS}
						</Link>
						<Link to="/add" onClick={this.onMenuVisibilityChanged} >
							{this.props.dictionary.MENULABEL_ADD}
						</Link>
					</nav>
				</div>
			</div>
		);
	}

	renderNavButton() {
		return (<div className="menuButton" onClick={this.onMenuVisibilityChanged} />);
	}
}