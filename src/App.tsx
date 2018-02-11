import * as React from 'react';
import './App.css';
import InputView from './components/InputView';
import PageView from './enum/PageView';
import Language from './enum/Language';
import LangView from './components/LangView';

export interface State {
  input: string;
  inputLang?: Language;
  currentView: PageView;
}

export interface Props {}

class App extends React.Component<Props, State> {
  
  constructor(props: Props) {
    super(props);
    this.state = {input: '', currentView: PageView.Input};
    this.onInputSubmit = this.onInputSubmit.bind(this);
    this.onLangClick = this.onLangClick.bind(this);
  }

  onInputSubmit(input: string) {
    this.setState({input: input, currentView: PageView.Lang});
  }

  onLangClick(lang: Language) {
    this.setState({inputLang: lang});
  }

  render() {
    console.log(this.state);

    switch (this.state.currentView) {

      case PageView.Input:
        return (
          <div className="page">
            <InputView onInputSubmit={this.onInputSubmit} />
          </div>
        );

      case PageView.Lang:
        return (
          <div className="page">
            <LangView input={this.state.input} onLangClick={this.onLangClick} />
          </div>
        );

      default:
        return null;
    }

  }
}

export default App;
