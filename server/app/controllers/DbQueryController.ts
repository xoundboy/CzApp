const GAPI_PROJECT_ID = process.env.CZAPP_GAPI_CLIENT_ID;

import { LoginTicket } from 'google-auth-library/build/src/auth/loginticket';
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(GAPI_PROJECT_ID);
import { Request, Response } from 'express';
import Mysql from '../util/Mysql';

export abstract class DbQueryController {

	protected req!: Request;
	protected res!: Response;
	protected userId: string = 'anonymous user';
	private requireAuth: boolean;

	public constructor(requireAuth: boolean = true) {
		this.requireAuth = requireAuth;
		this.execute = this.execute.bind(this);
		this.executeQuery = this.executeQuery.bind(this);
	}

	abstract getQuery(): string;

	public execute(req: Request, res: Response, next: Function): void {
		this.req = req;
		this.res = res;

		if (this.requireAuth)
			client.verifyIdToken(
				{
					idToken: this.req.body.idToken,
					audience: GAPI_PROJECT_ID,
				},
				(err: Error | null, login: LoginTicket) => {
					const payload = login.getPayload();
					if (!payload || !payload.sub)
						return this.fail(403, 'Invalid token');
					if (payload && payload.sub)
						this.userId = payload.sub;
					this.executeQuery();
				});
		else
			this.executeQuery();
	}

	executeQuery() {
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

	fail(statusCode: number, message: string) {
		this.res
			.header('Access-Control-Allow-Origin', '*')
			.status(statusCode).send(message);
	}
}
