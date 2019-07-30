import LexemePairParser from './LexemePairParser';
import ILexemePair from '../api/ILexemePair';

export default class LexemePairCollectionParser {

	/* tslint:disable no-any */
	public static parse(data: any): Array<ILexemePair> | null {
		try {
			const output: Array<ILexemePair> = [];

			for (const index in data)
				if (data.hasOwnProperty(index))
					output.push(LexemePairParser.parse(data[index]));

			return output;

		} catch (error) {
			return null;
		}
	}
}
