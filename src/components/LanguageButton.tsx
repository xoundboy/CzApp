import * as React from 'react';
import { Component } from 'react';
import Language from '../enum/Language';

export interface Props {
    label: string;
    language: Language;
    onClick: (language: Language) => void;
}

class LanguageButton extends Component<Props, object> {

    constructor(props: Props) {
        super(props);
        this.onButtonClicked = this.onButtonClicked.bind(this);
    }

    onButtonClicked(event: React.MouseEvent<HTMLButtonElement>) {
        event.stopPropagation();
        this.props.onClick(this.props.language);
    }

    render() {
        return (                
            <button 
                className={this.props.language.toString()}
                onClick={this.onButtonClicked} 
            />
        );
    }
}

export default LanguageButton;