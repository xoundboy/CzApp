import Controller from './Controller';

const GAPI_PROJECT_ID = process.env.CZAPP_GAPI_PROJECT_ID;

import { TranslateRequest } from '@google-cloud/translate';
const { Translate } = require('@google-cloud/translate');

export class Translation extends Controller {

	public constructor(requireAuth: boolean = true) {
		super(requireAuth);
	}

	protected perform(): void {
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
				console.log(JSON.stringify(results));
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
				this.fail(500, JSON.stringify(err.stack));
			});
	}
}
