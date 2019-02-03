import { Request, Response } from 'express';
import { LoginTicket } from 'google-auth-library/build/src/auth/loginticket';
const { OAuth2Client } = require('google-auth-library');
const CLIENT_ID = '1076782358657-ek02t3rpa2e7e1kll0pntvl7li7jo827.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);
const { Translate } = require('@google-cloud/translate');
const projectId = 'b888c48bd1dd0fd0d46d7cd3001d7073e2035ffc';
const translate = new Translate({
	projectId: projectId,
});

// The text to translate
const text = 'Hello, world!';
// The target language
const target = 'ru';

export class Translate {

	protected req!: Request;
	protected res!: Response;
	protected userId: string = 'anonymous user';
	private requireAuth: boolean;

	public constructor(requireAuth: boolean = true) {
		this.requireAuth = requireAuth;
		this.execute = this.execute.bind(this);
	}

	public execute(req: Request, res: Response, next: Function): void {
		this.req = req;
		this.res = res;
		if (this.requireAuth)
			client.verifyIdToken(
				{
					idToken: this.req.body.idToken,
					audience: CLIENT_ID,
				},
				(err: Error | null, login: LoginTicket) => {
					const payload = login.getPayload();
					if (!payload || !payload.sub)
						return this.fail(403, 'Invalid token');
					if (payload && payload.sub)
						this.userId = payload.sub;
					this.perform();
				});
		else
			this.perform();
	}

	private perform(): void {
		translate
			.translate(text, target)
			.then((results: any) => {
				const translation = results[0];

				console.log(`Text: ${text}`);
				console.log(`Translation: ${translation}`);
			})
			.catch((err: Error) => {
				console.error('ERROR:', err);
			});

	}

	fail(statusCode: number, message: string) {
		this.res
			.header('Access-Control-Allow-Origin', '*')
			.status(statusCode).send(message);
	}

}