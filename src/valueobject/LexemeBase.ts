export default abstract class LexemeBase {

	public text: string;
	public notes: string;

	protected constructor(text: string, notes: string = null) {
		this.text = text;
		this.notes = notes;
	}
}