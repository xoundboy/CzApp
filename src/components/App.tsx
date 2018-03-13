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
            <div>
                {this.renderNavButton()}
            </div> 
        );
    }

    renderNavOpen() {
        return (
            <div>
                {this.renderNavButton()}
                <nav>
                    <Link to="/settings" onClick={this.onNavButtonClicked} >Settings</Link>
                    <Link to="/add" onClick={this.onNavButtonClicked} >Add word or phrase</Link>
                </nav>
            </div>
        );
    }

    renderNavButton() {
        return (<div className="navButton" onClick={this.onNavButtonClicked} />);
    }

    renderPageContent() {
        return (
            <div className="pageContent">
                <Route path="/" exact={true}><h1/></Route>
                <Route path="/settings" component={Settings} />
                <Route path="/add" component={Add} />
            </div>
        );
    }
} 