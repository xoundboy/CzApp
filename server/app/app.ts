// lib/app.ts
import * as bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express = require('express');
import cors from 'cors';
import morgan from 'morgan';
import { Translation } from './controllers/Translation';

import AddOrInsertLexemePair from './controllers/InsertOrUpdateLexemePair';
import SelectLexemes from './controllers/SelectLexemes';
import SelectLexemePair from './controllers/selectLexemePair';
import DeleteLexemePair from './controllers/DeleteLexemePair';
import SelectTestLexemes from './controllers/SelectTestLexemes';
import UpdateLexemePairFamiliarity from './controllers/UpdateLexemePairFamiliarity';

const port = process.env.CZAPP_SERVER_PORT;

// Create a new express application instance
const app: express.Application = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Enable cli logging of requests (only needed for development)
app.use(morgan('combined'));

// Enable the collecting of users' public IP addresses when Express
// is behind a proxy. (Only needed for production)
app.set('trust proxy', 'loopback');

app.route('/lexemes')
	.post(new AddOrInsertLexemePair(true).execute);

app.route('/lexemes')
	.get(new SelectLexemes(true).execute);

app.route('/lexemes/:testType/:testLength')
	.get(new SelectTestLexemes(true).execute);

app.route('/lexemePair/:czId/:enId')
	.get(new SelectLexemePair(true).execute);

app.route('/lexemePair/:czId/:enId')
	.delete(new DeleteLexemePair(true).execute);

app.route('/lexemePair/:czId/:enId/:familiarity')
	.put(new UpdateLexemePairFamiliarity(true).execute);

app.route('/translate')
	.post(new Translation(false).execute);

app.listen(port, () => console.log(`Czapp API services listening on port ${port}!`));
