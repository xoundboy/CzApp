import * as React from 'react';
import Language from '../../enum/Language';
import { Component, ChangeEvent } from 'react';

export interface Props {
    input: string;
    inputLang: Language;
    note: string;
    translation: string;
    translationLang: Language;
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
            <div className="view noteView">
                <p className="input">
                    <span className={inputFlagClass} />
                    <span>{this.props.input}</span>
                </p>
                <p className="translation">
                    <span className={translationFlagClass} />
                    <span>{this.props.translation}</span> 
                </p>

                <textarea onChange={this.onChange} value={this.state.note} />
                <p><button onClick={this.onNoteSubmitted}>Add note</button></p>
            </div>
        );
    }
}

export default NoteView;
