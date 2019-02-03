import Controller from './Controller';
import Mysql from '../util/Mysql';

export abstract class DbQueryController extends Controller {

	protected constructor(requireAuth: boolean = true) {
		super(requireAuth);
	}

	protected abstract getQuery(): string;

	protected perform() {
		Mysql.createConnection().query(this.getQuery(), (error: Error, rows: any) => { // TODO can't use type any, must declare type for rows returned from query
			if (error) {
				this.res.header('Access-Control-Allow-Origin', '*');
				this.res.status(500).send({ error: error });
				return;
			}
			this.res.header('Access-Control-Allow-Origin', '*');
			this.res.json(rows);
		});
	}
}
