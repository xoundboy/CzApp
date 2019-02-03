const GAPI_PROJECT_ID = process.env.CZAPP_GAPI_CLIENT_ID;

const { OAuth2Client } = require('google-auth-library');
import { LoginTicket } from 'google-auth-library/build/src/auth/loginticket';
import { Request, Response } from 'express';

export default abstract class Controller  {

	protected req!: Request;
	protected res!: Response;
	protected userId: string = 'anonymous user';
	private readonly requireAuth: boolean;
	private client = new OAuth2Client(GAPI_PROJECT_ID);

	protected constructor(requireAuth: boolean = true) {
		this.requireAuth = requireAuth;
		this.execute = this.execute.bind(this);
		this.perform = this.perform.bind(this);
	}

	protected abstract perform(): void;

	public execute(req: Request, res: Response, next: Function): void {
		this.req = req;
		this.res = res;

		if (this.requireAuth)
			this.client.verifyIdToken(
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
					this.perform();
				});
		else
			this.perform();
	}

	protected fail(statusCode: number, message: string) {
		this.res
			.header('Access-Control-Allow-Origin', '*')
			.status(statusCode).send(message);
	}
}
