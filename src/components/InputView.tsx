import * as React from 'react';

export interface Props {
    input?: string;
    onSubmit: ((input: string) => void);
}

export interface State {
    inputValue: string;
}

class InputView extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {inputValue: ''};
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event: React.MouseEvent<HTMLInputElement>) {
        console.log(this.state.inputValue);
    }

    handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({inputValue: event.target.value});
    }

    render() {
        return (
            <div className="inputView">
                <div>Input view</div>
                <input type="text" value={this.state.inputValue} onChange={this.handleInputChange} />
                <button onClick={this.handleSubmit}>Submit</button>
            </div>
        );
    }
}

export default InputView;