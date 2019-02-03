// lib/app.ts
import * as bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express = require('express');
import cors from 'cors';
import InsertLexemePair from './controllers/InsertLexemePair';
import morgan from 'morgan';
import { Translation } from './controllers/Translation';

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
	.post(new InsertLexemePair(true).execute);

app.route('/translate')
	.post(new Translation(false).execute);

app.listen(3002, function () {
	console.log('Example app listening on port 3002!');
});