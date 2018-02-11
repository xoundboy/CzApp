import * as React from 'react';
import { MouseEvent } from 'react';
import Language from '../enum/Language';

export interface Props {
    input: string;
    onLangClick: ((lang: Language) => void);
}

// export interface State {
//     selectedLang: Language;
// }

class LangView extends React.Component<Props, object> {

    constructor(props: Props) {
        super(props);
        this.handleLanguageClick = this.handleLanguageClick.bind(this);
    }

    handleLanguageClick(event: MouseEvent<HTMLButtonElement>) {
        console.log(event);
        // this.props.onLangClick(this.state.inputValue);
    }

    render() {
        return (
            <div className="langView">
                <div>{this.props.input}</div>
                <button onClick={this.handleLanguageClick} value={Language.Czech}>Czech</button>
                <button onClick={this.handleLanguageClick} value={Language.English}>English</button>
            </div>
        );
    }
}

export default LangView;