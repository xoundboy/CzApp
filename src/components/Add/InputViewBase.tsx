import * as React from 'react';
import { ChangeEvent, KeyboardEvent } from 'react';
import Lexeme from '../../valueobject/Lexeme';

export interface InputViewBaseProps {
    lexeme: Lexeme;
    onSubmit: ((input: string) => void);
}

export interface InputViewBaseState {
    inputValue: string;
    valid: boolean;
}

class InputViewBase<TProps extends InputViewBaseProps, TState extends 
    InputViewBaseState> extends React.Component<TProps, TState> {

    protected _valid: boolean = true;

    set valid(value: boolean) {
        if (this._valid !== value) {
            this._valid = value;
            this.setState({valid: value});
        }
    }

    constructor(props: TProps) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleKeyup = this.handleKeyup.bind(this);
    }

    handleSubmit() {
        this.validateInput();
        if (this._valid) {
            this.props.onSubmit(this.state.inputValue);
        } 
    }

    validateInput() {
        throw new Error('override in child');
    }

    handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        this.validateInput();
        this.setState({inputValue: event.target.value});
    }

    handleKeyup(event: KeyboardEvent<HTMLInputElement>) {
        if (event.which === 13) {
            this.handleSubmit();
        }
    }

    getFlagClassName() {
        return 'flag ' + this.props.lexeme.language;
    }
}

export default InputViewBase;