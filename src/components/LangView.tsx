import * as React from 'react';
import Language from '../enum/Language';
import LanguageButton from './LanguageButton';

export interface Props {
    input: string;
    onLangClick: ((lang: Language) => void);
}

class LangView extends React.Component<Props, object> {

    constructor(props: Props) {
        super(props);
        this.onLanguageButtonCick = this.onLanguageButtonCick.bind(this);
    }

    onLanguageButtonCick(language: Language) {
        this.props.onLangClick(language);
    }

    render() {
        return (
            <div className="view langView">
                <div className="whichLang">Which language is this?</div>
                <div className="flagButtons">
                    <LanguageButton
                        language={Language.Czech}
                        onClick={this.onLanguageButtonCick}
                        label=""
                    />
                    <LanguageButton
                        language={Language.English}
                        onClick={this.onLanguageButtonCick}
                        label=""
                    />
                </div>
                <div className="inputText">{this.props.input}</div>
            </div>
        );
    }
}

export default LangView;