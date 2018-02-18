import * as React from 'react';
import InputViewBase, { InputViewBaseProps, InputViewBaseState } from './InputViewBase';

class InputView extends InputViewBase<InputViewBaseProps, InputViewBaseState> {

    constructor(props: InputViewBaseProps) {
        super(props);
    }

    componentWillMount() {
        this.setState({inputValue: this.props.input});
    }

    getFlagClassName() {
        return 'flag ' + this.props.inputLang;
    }

    validateInput() {
        this.valid = this.state.inputValue.length > 0;
    }

    render() {
        var className = !this._valid ? 'invalid' : '';
        
        return (
            <div className="view inputView">
                <input
                    type="text"
                    value={this.state.inputValue}
                    onChange={this.handleInputChange}
                    onKeyPress={this.handleKeyup}
                    className={className}
                    autoFocus={true}
                    placeholder="English or Czech word or phrase"
                />
                <button onClick={this.handleSubmit}>Submit</button>
            </div>
        );
    }
}

export default InputView;