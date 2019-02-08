import * as React from 'react';
import { Route } from 'react-router';
import Settings from './settings/Settings';
import Add from './add/Add';
import AddView from '../enum/AddView';
import { Component } from 'react';
import Tests from './tests/Tests';
import Search from './search/Search';
import Recent from './recent/Recents';
import Edit from './edit/Edit';

export default class PageLayer extends Component {

	render() {
		return (
			<div className="pageLayer">
				<Route path="/settings" render={() => <Settings/>} />
				<Route path="/add/en" render={() => <Add view={AddView.ENGLISH} />} />
				<Route path="/add/cz" render={() => <Add view={AddView.CZECH} />} />
				<Route path="/add/confirm" render={() => <Add view={AddView.CONFIRM} />} />
				<Route path="/tests" render={() => <Tests/>} />
				<Route path="/search" render={() => <Search/>} />
				<Route path="/recent" render={() => <Recent/>} />
				<Route path="/show/:id" render={(props) => <Edit {...props}/>} />
			</div>
		);
	}
}
