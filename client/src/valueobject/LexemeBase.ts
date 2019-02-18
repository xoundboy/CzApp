export default abstract class LexemeBase {

	public text: string;
	public notes: string;
	public id: number;
	public dateAdded: string;

	protected constructor(text: string, notes: string = null, id: number = null, dateAdded: string = null) {
		this.text = text;
		this.notes = notes;
		this.id = id;
		this.dateAdded = dateAdded;
	}
}
