import * as React from 'react';
import './App.scss';
import InputView from './components/InputView';
import PageView from './enum/PageView';
import Language from './enum/Language';

export interface State {
  input?: string;
  inputLang?: Language;
  currentView: PageView;
}

export interface Props {}

class App extends React.Component<Props, State> {
  
  constructor(props: Props) {
    super(props);
    this.state = {currentView: PageView.Input};
  }

  render() {
    if (this.state.currentView === PageView.Input) {
      return (
        <div className="page">
          <InputView onSubmit={onSubmit} />
        </div>
      );
    } else {
      return null;
    }
  }
}

function onSubmit(input: string) {
  throw new Error('submit clicked');
}

export default App;
