// import * as React from 'react';
// import { ChangeEvent } from 'react';
// import Lexeme from '../../valueobject/Lexeme';
// import LocalizedComponent, { LocalizedComponentProps } from '../generic/LocalizedComponent';
//
// export interface NoteViewProps extends LocalizedComponentProps {
// 	lexeme: Lexeme;
// 	onSubmit: (lexeme: Lexeme) => void;
// }
//
// export interface NoteViewState {
// 	note: string;
// }
//
// export default class NoteView extends LocalizedComponent<NoteViewProps, NoteViewState> {
//
// 	constructor(props: NoteViewProps) {
// 		super(props);
// 		this.onNoteSubmitted = this.onNoteSubmitted.bind(this);
// 		this.onChange = this.onChange.bind(this);
// 	}
//
// 	componentWillMount() {
// 		this.setState({note: this.props.lexeme.note});
// 	}
//
// 	onNoteSubmitted() {
// 		let lexeme = Object.assign({}, this.props.lexeme);
// 		lexeme.note = this.state.note;
// 		this.props.onSubmit(lexeme);
// 	}
//
// 	onChange(event: ChangeEvent<HTMLTextAreaElement>) {
// 		this.setState({note: event.target.value});
// 	}
//
// 	render() {
// 		return (
// 			<div className="view noteView">
// 				<p className="input">
// 					<span>{this.props.lexeme.text}</span>
// 				</p>
// 				<p className="translation">
// 					<span>{this.props.lexeme.translation}</span>
// 				</p>
//
// 				<textarea onChange={this.onChange} value={this.state.note} />
// 				<p><button onClick={this.onNoteSubmitted}>{this.props.dictionary.BUTTON_ADD_NOTE}</button></p>
// 			</div>
// 		);
// 	}
// }
