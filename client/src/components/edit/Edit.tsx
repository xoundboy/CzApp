import Add, { IAddProps } from '../add/Add';

import LoaderUtil from '../../util/LoaderUtil';
import LexemePairParser from '../../parsers/LexemePairParser';

interface IEditProps extends IAddProps {
	czId: number;
	enId: number;
}

export default class Edit extends Add<IEditProps> {

	componentDidMount() {
		this.loadLexemePair();
	}

	loadLexemePair() {
		const path = `lexemePair/${this.props.czId}/${this.props.enId}`;
		const method = 'GET';

		LoaderUtil.getData(this.context, path, method, (json: string) => {
			if (json[0].length > 0) {
				const lexemePair = LexemePairParser.parse(json[0][0]);
				this.context.onLexemePairEdited(lexemePair);
			} else
				LoaderUtil.handleError();
		});
	}
}
