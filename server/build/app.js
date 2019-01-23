"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// lib/app.ts
var bodyParser = __importStar(require("body-parser"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var express = require("express");
var cors_1 = __importDefault(require("cors"));
var InsertLexemePair_1 = __importDefault(require("./controllers/InsertLexemePair"));
// Create a new express application instance
var app = express();
app.use(cors_1.default());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookie_parser_1.default());
app.route('/lexemes')
    .post(new InsertLexemePair_1.default().execute);
app.listen(3002, function () {
    console.log('Example app listening on port 3002!');
});
