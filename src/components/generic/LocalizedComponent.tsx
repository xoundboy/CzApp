import { Component } from 'react';

import Dictionary from '../../api/Dictionary';

export interface LocalizedComponentProps {
	dictionary: Dictionary;
}

export default class LocalizedComponent<TProps extends LocalizedComponentProps, TState>
	extends Component<TProps, TState> {
}