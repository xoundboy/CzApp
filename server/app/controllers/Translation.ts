const GAPI_CLIENT_ID = process.env.CZAPP_GAPI_CLIENT_ID;
const GAPI_PROJECT_ID = process.env.CZAPP_GAPI_PROJECT_ID;

import { Request, Response } from 'express';
import { LoginTicket } from 'google-auth-library/build/src/auth/loginticket';
import { TranslateRequest } from '@google-cloud/translate';
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(GAPI_CLIENT_ID);
const { Translate } = require('@google-cloud/translate');

export class Translation {

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
					audience: GAPI_CLIENT_ID,
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
		const translate = new Translate({
			projectId: GAPI_PROJECT_ID
		});

		const options: TranslateRequest = {
			format: this.req.body.format,
			from: this.req.body.source,
			model: '',
			to: this.req.body.target,
		};

		translate
			.translate(this.req.body.q, options)
			.then((results: any) => {
				this.res.header('Access-Control-Allow-Origin', '*')
					.status(200).json({
					data: {
						translations: [{
							translatedText: results[0]
						}]
					}
				});
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