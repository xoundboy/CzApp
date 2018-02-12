import * as React from 'react';
import { Component, ChangeEvent } from 'react';
import Language from '../enum/Language';

export interface Props {
    input: string;
    inputLang: Language;
    translation: string;
    translationLang: Language;
    note: string;
    onNoteSubmitted: (note: string) => void;
}

export interface State {
    note: string;
}

class NoteView extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {note: props.note};
        this.onNoteSubmitted = this.onNoteSubmitted.bind(this);
        this.onChange = this.onChange.bind(this);
      }

    onNoteSubmitted() {
        this.props.onNoteSubmitted(this.state.note);
    }

    onChange(event: ChangeEvent<HTMLTextAreaElement>) {
        this.setState({note: event.target.value});
    }

    render() {
        var inputFlagClass = 'flag ' + this.props.inputLang;
        var translationFlagClass = 'flag ' + this.props.translationLang;
        return (
            <div className="noteView">
                <p>Add Note</p>
                <p className="input">
                    <span className={inputFlagClass} />
                    <span>{this.props.input}</span>
                </p>
                <p className="translation">
                    <span className={translationFlagClass} />
                    <span>{this.props.translation}</span> 
                </p>

                <textarea onChange={this.onChange} value={this.state.note} />
                <p><button onClick={this.onNoteSubmitted}>Submit note</button></p>
            </div>
        );
    }
}

export default NoteView;
