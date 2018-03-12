import * as React from 'react';
import { Component } from 'react'; 
import Add from './add/Add';
import { Link } from 'react-router-dom';
import { Route } from 'react-router';
import Settings from './settings/Settings';

export interface AppState {
    navIsOpen: Boolean;
}

export default class App extends Component<object, AppState> {

    constructor(props: object) {
        super(props);
        this.state = {
            navIsOpen: false
        };
        this.onNavButtonClicked = this.onNavButtonClicked.bind(this);
    }

    onNavButtonClicked() {
        this.setState({navIsOpen: !this.state.navIsOpen});
    }

    render() {
        console.log(this.state.navIsOpen);
        
        return (
            <div className={this.constructor.name}>
                <div className="navLayer">
                    {this.state.navIsOpen ? this.renderNavOpen() : this.renderNavClosed()}
                </div>
                <div className="pageLayer">
                    {this.renderPageContent()}
                </div>
            </div>
        );
    }

    renderNavClosed() {
        return (
            <div className="navButton" onClick={this.onNavButtonClicked} />
        );
    }

    renderNavOpen() {
        return (
            <nav>
                <Link to="/settings">Settings</Link>
                <Link to="/add">Add word or phrase</Link>
            </nav>
        );
    }

    renderPageContent() {
        return (
            <div className="pageContent">
                <Route path="/" exact={true}><h1>CZ-App</h1></Route>
                <Route path="/settings" component={Settings} />
                <Route path="/add" component={Add} />
            </div>
        );
    }
} 