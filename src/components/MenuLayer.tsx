import * as React from 'react';
import LocalizedComponent, { LocalizedComponentProps } from './generic/LocalizedComponent';
import { Link } from 'react-router-dom';
import Language from '../enum/Language';

export interface MenuLayerProps extends LocalizedComponentProps {
	inputLanguage: Language;
}

export interface MenuLayerState {
	navIsOpen: Boolean;
}

export default class MenuLayer extends LocalizedComponent<MenuLayerProps, MenuLayerState> {

	constructor(props: MenuLayerProps) {
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
		const addPageLink = `/add/${this.props.inputLanguage}`;
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
						<Link to={addPageLink} onClick={this.onMenuVisibilityChanged} >
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