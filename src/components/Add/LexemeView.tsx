import * as React from 'react';
import Lexeme from '../../valueobject/Lexeme';
import ValidatedTextInput from '../generic/ValidatedTextInput';
import { KeyboardEvent } from 'react';
import LanguageUtil from '../../util/LanguageUtil';

export interface LexemeViewProps {
    lexeme: Lexeme;
    onSubmit: ((lexeme: Lexeme) => void);
}

export interface LexemeViewState {
    text: string | null;
    valid: boolean;
}

export default class LexemeView extends React.Component<LexemeViewProps, LexemeViewState> {

    constructor(props: LexemeViewProps) {
        super(props);
        this.onValueChange = this.onValueChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
    }

    componentWillMount() {
        this.setState({text: this.props.lexeme.text});
    }

    onValueChange(value: string | null) {
        this.setState({text: value});
    }

    onSubmit() {
        if (!this.state.text) {
            return;
        }
        let lexeme = Object.assign({}, this.props.lexeme);
        lexeme.text = this.state.text;
        this.props.onSubmit(lexeme);
    }

    onKeyUp(event: KeyboardEvent<HTMLInputElement>) {
        if (event.which === 13) {
            this.onSubmit();
        }
    }

    render() {
        return (
            <div className="view lexemeView">
                <ValidatedTextInput
                    value={this.state.text}
                    placeholderText={'Word or phrase in ' + LanguageUtil.getLanguageName(this.props.lexeme.language)}
                    autofocus={true}
                    onValueChange={this.onValueChange}
                    onKeyUp={this.onKeyUp}
                />
                <button onClick={this.onSubmit}>Submit</button>
            </div>
        );
    }
}
