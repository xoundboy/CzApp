import * as React from 'react';
import { ChangeEvent } from 'react';
import Language from '../enum/Language';

export interface Props {
    input: string;
    inputLang?: Language;
    onInputSubmit: ((input: string) => void);
}

export interface State {
    inputValue: string;
}

class InputView extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {inputValue: props.input};
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        this.props.onInputSubmit(this.state.inputValue);
    }

    handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        this.setState({inputValue: event.target.value});
    }

    getFlagClassName() {
        return 'flag ' + this.props.inputLang;
    }

    render() {
        return (
            <div className="inputView">
                <form onSubmit={this.handleSubmit}>
                    <span className={this.getFlagClassName()} />
                    <input 
                        type="text" 
                        value={this.state.inputValue} 
                        onChange={this.handleInputChange}
                        autoFocus={true}
                    />
                    <button type="submit">Enter</button>
                </form>
            </div>
        );
    }
}

export default InputView;