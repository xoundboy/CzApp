import { Component } from 'react';
import { Route } from 'react-router';
import * as React from 'react';

interface INavButtonProps {
	additionalClasses: string;
	targetPath: string;
	label: string;
	disabled?: boolean;
}

export default class NavButton extends Component<INavButtonProps> {

	render() {

		return(
			<Route
				render={({history}) => (
					<button
						type="button"
						className={this.props.additionalClasses}
						onClick={() => {
							history.push(this.props.targetPath);
						}}
						disabled={this.props.disabled}
					>
						{this.props.label}
					</button>
				)}
			/>
		);
	}
}