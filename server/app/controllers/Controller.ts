import { LoginTicket } from 'google-auth-library/build/src/auth/loginticket';

const { OAuth2Client } = require('google-auth-library');
const CLIENT_ID = '1076782358657-ek02t3rpa2e7e1kll0pntvl7li7jo827.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);
import { Request, Response } from 'express';

export abstract class Controller {

	protected req!: Request;
	protected res!: Response;
	private callback!: Function;

	protected constructor() {
		this.onTokenValidated = this.onTokenValidated.bind(this);
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

	onTokenValidated(err: Error | null, login: LoginTicket) {

		const payload = login.getPayload();

		if (!payload || !payload.sub)
			return this.fail(403, 'Invalid token');
		else
			this.callback();
	}

	fail(statusCode: number, message: string) {
		this.res
			.header('Access-Control-Allow-Origin', '*')
			.status(statusCode).send(message);
	}
}
