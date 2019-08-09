import Controller from './Controller';
import Mysql from '../util/Mysql';

export abstract class DbQueryController extends Controller {

	protected constructor(requireAuth: boolean = true) {
		super(requireAuth);
	}

	protected abstract getQuery(): string;

	protected perform() {
		// TODO can't use type any, must declare type for rows returned from query
		Mysql.createConnection().query(this.getQuery(), (error: Error, rows: any) => {
			if (error) {
				this.res.header('Access-Control-Allow-Origin', '*');
				this.res.status(500).send({ error: error });
				return;
			}
			this.res.header('Access-Control-Allow-Origin', '*');
			this.res.json(rows);
		});
	}

	protected sanitise (a: string) {
		if (a === undefined)
			return '';
		return a.replace(/'/g, '\\\'');
	}
}
