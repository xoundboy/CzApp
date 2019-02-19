import Add, { IAddProps } from '../add/Add';

interface IEditProps extends IAddProps {
	czId: number;
	enId: number;
}

export default class Edit extends Add<IEditProps> {

	constructor(props: IEditProps) {
		super(props);
	}

	componentDidMount() {
		console.log(this.props);
		// Todo - fetch the lexeme pair and populate the add forms to turn them into edit forms
	}
}