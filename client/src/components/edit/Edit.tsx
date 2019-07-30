import Add, { IAddProps } from '../add/Add';
import ILexemePair from '../../api/ILexemePair';
import CzechLexeme from '../../valueobject/CzechLexeme';
import EnglishLexeme from '../../valueobject/EnglishLexeme';
import LexemePair from '../../valueobject/LexemePair';

const backendBaseUrl = process.env.REACT_APP_CZAPP_BACKEND_BASE_URL;

interface IEditProps extends IAddProps {
	czId: number;
	enId: number;
}

export default class Edit extends Add<IEditProps> {

	constructor(props: IEditProps) {
		super(props);
		this.fetchData = this.fetchData.bind(this);
	}

	componentDidMount() {
		// Todo - fetch the lexeme pair and populate the add forms to turn them into edit forms
		this.fetchData();
	}

	fetchData() {
		// todo fetch from client side model to avoid having to request it from the BE
		const idToken = this.context.googleAuth.currentUser.get().getAuthResponse().id_token;
		fetch(
			`${backendBaseUrl}/lexemePair/${this.props.czId}/${this.props.enId}`,
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
				if (myJson[0].length > 0) {
						const lexemePair = this.parseRecord(myJson[0][0]);
						this.context.onLexemePairEdited(lexemePair);
				} else
					throw new Error('no records found');
			});
	}

	/* tslint:disable no-any */
	parseRecord(data: any): ILexemePair | null {

		try {

			const czechLexeme = new CzechLexeme();
			czechLexeme.id = data.cz_id;
			czechLexeme.text = data.cz_text;
			czechLexeme.notes = data.cz_notes;
			czechLexeme.type = data.cz_type;
			czechLexeme.wordType = data.cz_wordType;
			czechLexeme.phraseType = data.cz_phraseType;
			czechLexeme.id = data.cz_id;
			czechLexeme.dateAdded = data.cz_ts;
			czechLexeme.userId = data.cz_userId;
			czechLexeme.gender = data.cz_gender;
			czechLexeme.verbAspect = data.cz_verbAspect;

			const englishLexeme = new EnglishLexeme();
			englishLexeme.id = data.en_id;
			englishLexeme.text = data.en_text;
			englishLexeme.notes = data.en_notes;
			englishLexeme.type = data.en_type;
			englishLexeme.wordType = data.en_wordType;
			englishLexeme.phraseType = data.en_phraseType;
			englishLexeme.id = data.en_id;
			englishLexeme.dateAdded = data.en_ts;
			englishLexeme.userId = data.en_userId;

			const output: ILexemePair = new LexemePair(englishLexeme, czechLexeme);
			output.dateAdded = data.map_dateAdded;
			output.ip = data.map_ip;
			output.notes = data.map_notes;
			output.userId = data.map_userId;

			return output;

		} catch (error) {
			return null;
		}
	}
}
