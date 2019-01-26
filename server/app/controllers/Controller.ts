import { LoginTicket } from 'google-auth-library/build/src/auth/loginticket';

const { OAuth2Client } = require('google-auth-library');
const CLIENT_ID = '1076782358657-ek02t3rpa2e7e1kll0pntvl7li7jo827.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);
import { Request, Response } from 'express';
import Mysql from '../util/Mysql';

export abstract class Controller {

	protected req!: Request;
	protected res!: Response;
	protected userId: string = '';
	private callback!: Function;

	public constructor() {
		this.onTokenValidated = this.onTokenValidated.bind(this);
		this.executeQuery = this.executeQuery.bind(this);
		this.getQuery = this.getQuery.bind(this);
		this.onQueryExecuted = this.onQueryExecuted.bind(this);
		this.execute = this.execute.bind(this);
	}

	protected validateToken(callback: Function) {
		this.callback = callback;
		client.verifyIdToken(
			{
				idToken: this.req.body.idToken,
				audience: CLIENT_ID,
			},
			this.onTokenValidated);
		return true;
	}

	public execute(req: Request, res: Response, next: Function): void {
		this.req = req;
		this.res = res;
		this.validateToken(this.executeQuery);
	}

	executeQuery() {
		Mysql.createConnection().query(this.getQuery(), this.onQueryExecuted);
	}

	abstract getQuery(): string;

	onQueryExecuted(err: Error, rows: any) { // TODO can't use type any, must declare type for rows returned from query
		if (err) {
			this.res.header('Access-Control-Allow-Origin', '*');
			this.res.status(500).send({ error: err });
			return;
		}
		this.res.header('Access-Control-Allow-Origin', '*');
		this.res.json(rows);
	}

	onTokenValidated(err: Error | null, login: LoginTicket) {
		const payload = login.getPayload();
		if (!payload || !payload.sub)
			return this.fail(403, 'Invalid token');
		if (payload && payload.sub)
			this.userId = payload.sub;
		this.callback();
	}

	fail(statusCode: number, message: string) {
		this.res
			.header('Access-Control-Allow-Origin', '*')
			.status(statusCode).send(message);
	}
}
