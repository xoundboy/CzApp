import * as React from 'react';
import { Component } from 'react';
import { AppContextConsumer, IAppContext } from '../../AppContext';
import Lexeme from './Lexeme';
import ILexemeDto from '../../api/ILexemeDto';
const backendBaseUrl = process.env.REACT_APP_CZAPP_BACKEND_BASE_URL;

interface IRecentsState {
	data: Array<ILexemeDto>;
}

export default class Recents extends Component<object, IRecentsState> {

	context: IAppContext;

	constructor(props: object) {
		super(props);
		this.fetchData = this.fetchData.bind(this);
		this.state = {
			data: null
		};
	}

	componentDidMount() {
		this.fetchData();
	}

	render() {
		return (
			<AppContextConsumer>
				{(context) => {
					this.context = context;

					if (!this.state.data)
						return null;

					return (<div>
						{this.state.data.map((recent, index) => <Lexeme data={recent} key={index} />)}
					</div>);
				}}
			</AppContextConsumer>
		);
	}

	fetchData() {
		const idToken = this.context.googleAuth.currentUser.get().getAuthResponse().id_token;
		fetch(
			`${backendBaseUrl}/lexemes`,
			{
				method: 'GET',
				mode: 'cors',
				cache: 'no-cache',
				credentials: 'same-origin',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': idToken
				},
				redirect: 'follow',
				referrer: 'no-referrer'
			})
			.then((response) => response.json())
			.then((myJson) => {
				if (myJson[0].length > 0)
					this.setState({data: myJson[0]});
			});
	}
}