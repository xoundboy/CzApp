// lib/app.ts
import * as bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express = require('express');
import cors from 'cors';
import InsertLexemePair from './controllers/InsertLexemePair';
import { Request, Response } from 'express';
import morgan from 'morgan';

// Create a new express application instance
const app: express.Application = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(morgan('combined'));

app.route('/lexemes')
	.post(new InsertLexemePair().execute);

app.route('/lexemes')
	.get(function(req: Request, res: Response, next: Function){
		res.send('hello from express');
	});

app.listen(3002, function () {
	console.log('Example app listening on port 3002!');
});