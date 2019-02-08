import * as React from 'react';
import { Component } from 'react';

interface IEditProps {

}

export default class Edit extends Component<IEditProps> {

	render() {
		console.log(this.props);
		return(<p>Edit page</p>);
	}

}