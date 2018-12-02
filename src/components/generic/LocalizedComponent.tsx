import { Component } from 'react';
import Language from '../../enum/Language';

import En from '../../valueobject/En';
import Cz from '../../valueobject/Cz';

export interface LocalizedComponentProps {
	uiLanguage: Language;
}

export default class LocalizedComponent<TProps extends LocalizedComponentProps, TState> 
	extends Component<TProps, TState> {

	constructor(props: TProps) {
		super(props);
	}

	getCopy(key: string) {
		if (this.props.uiLanguage === Language.ENGLISH) {
			return En[key];
		} else if (this.props.uiLanguage === Language.CZECH) {
			return Cz[key];
		}
	}
}