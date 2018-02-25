import * as React from 'react';
import { Component, ChangeEvent } from 'react';
import Lexeme from '../../valueobject/Lexeme';

export interface NoteViewProps {
    lexeme: Lexeme;
    onSubmit: (lexeme: Lexeme) => void;
}

export interface NoteViewState {
    note: string;
}

export default class NoteView extends Component<NoteViewProps, NoteViewState> {

    constructor(props: NoteViewProps) {
        super(props);
        this.onNoteSubmitted = this.onNoteSubmitted.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentWillMount() {
        this.setState({note: this.props.lexeme.note});
    }

    onNoteSubmitted() {
        let lexeme = Object.assign({}, this.props.lexeme);
        lexeme.note = this.state.note;
        this.props.onSubmit(lexeme);
    }

    onChange(event: ChangeEvent<HTMLTextAreaElement>) {
        this.setState({note: event.target.value});
    }

    render() {
        return (
            <div className="view noteView">
                <p className="input">
                    <span className={`flag ${this.props.lexeme.language}`} />
                    <span>{this.props.lexeme.text}</span>
                </p>
                <p className="translation">
                    <span className={`flag ${this.props.lexeme.translationLang}`} />
                    <span>{this.props.lexeme.translation}</span> 
                </p>

                <textarea onChange={this.onChange} value={this.state.note} />
                <p><button onClick={this.onNoteSubmitted}>Add note</button></p>
            </div>
        );
    }
}
