import * as React from 'react';
import { Component } from 'react'; 
import Add from './add/Add';
import { Link } from 'react-router-dom';
import { Route } from 'react-router';
import Settings from './settings/Settings';
import Language from '../enum/Language';

export interface AppState {
    navIsOpen: Boolean;
    inputLanguage: Language;
}

export default class App extends Component<object, AppState> {

    constructor(props: object) {
        super(props);
        this.state = {
            navIsOpen: false,
            inputLanguage: Language.ENGLISH // TODO - use storage provider
        };
        this.onNavVisibilityChanged = this.onNavVisibilityChanged.bind(this);
        this.onInputLanguageChanged = this.onInputLanguageChanged.bind(this);
    }

    onNavVisibilityChanged() {
        this.setState({navIsOpen: !this.state.navIsOpen});
    }

    onInputLanguageChanged(value: Language) {
        this.setState({inputLanguage: value});
    }

    render() {
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
                    <Link to="/settings" onClick={this.onNavVisibilityChanged} >Settings</Link>
                    <Link to="/add" onClick={this.onNavVisibilityChanged} >Add word or phrase</Link>
                </nav>
            </div>
        );
    }

    renderNavButton() {
        return (<div className="navButton" onClick={this.onNavVisibilityChanged} />);
    }

    renderPageContent() {
        return (
            <div className="pageContent">
                <Route path="/" exact={true}><h1/></Route>
                <Route 
                    path="/settings" 
                    render={ () => <Settings 
                        inputLanguage={this.state.inputLanguage}  
                        onInputLanguageChanged={this.onInputLanguageChanged}
                    /> } 
                />
                <Route 
                    path="/add" 
                    render={ () => <Add 
                        inputLanguage={this.state.inputLanguage}
                    /> } 
                />
            </div>
        );
    }
} 