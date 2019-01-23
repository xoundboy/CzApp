// lib/app.ts
import * as bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express = require('express');
import cors from 'cors';
import InsertLexemePair from './controllers/InsertLexemePair';

// Create a new express application instance
const app: express.Application = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.route('/lexemes')
	.post(new InsertLexemePair().execute);

app.listen(3002, function () {
	console.log('Example app listening on port 3002!');
});