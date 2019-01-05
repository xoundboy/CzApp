"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OAuth2Client = require('google-auth-library').OAuth2Client;
var mysql = require("mysql");
var config = {
    SERVER_PORT: process.env.CZAPP_SERVER_PORT,
    DB_HOST: process.env.CZAPP_DB_HOST,
    DB_NAME: process.env.CZAPP_DB_NAME,
    DB_USER: process.env.CZAPP_DB_USER,
    DB_PASS: process.env.CZAPP_DB_PASS
};
var CLIENT_ID = '1076782358657-ek02t3rpa2e7e1kll0pntvl7li7jo827.apps.googleusercontent.com';
var client = new OAuth2Client(CLIENT_ID);
// const wget = require('node-wget');
//
// wget({ url: "http://czapp.xoundesign.com"}, function (error, response, body) {
// 	console.log(error);
// 	console.log(response);
// 	console.log(body);
// });
function formatEnum(str) {
    if (str !== null && str !== undefined) {
        return str.toUpperCase();
    }
    else {
        return "";
    }
}
var IndexController = /** @class */ (function () {
    function IndexController() {
        this.lexemes = this.lexemes.bind(this);
    }
    IndexController.prototype.lexemes = function (req, res, next) {
        function isValid() {
            client.verifyIdToken({
                idToken: req.body.idToken,
                audience: CLIENT_ID,
            }, function (err, login) {
                var sub = login.getPayload().sub;
                if (sub) {
                }
                else {
                    res.header("Access-Control-Allow-Origin", "*").status(403).send("invalid token");
                }
            });
            return true;
        }
        function getQuery() {
            var wordType = formatEnum(req.body.wordType);
            var phraseType = formatEnum(req.body.phraseType);
            var type = formatEnum(req.body.type);
            var gender = formatEnum(req.body.czGender);
            var verbAspect = formatEnum(req.body.czVerbAspect);
            var notes = req.body.notes || "";
            var czNotes = req.body.czNotes || "";
            var enNotes = req.body.enNotes || "";
            var czWord = '';
            var czPhrase = '';
            var enWord = '';
            var enPhrase = '';
            if (type === "WORD") {
                czWord = req.body.czText;
                enWord = req.body.enText;
            }
            else {
                czPhrase = req.body.czText;
                enPhrase = req.body.enText;
            }
            return "CALL insertLexemePair('" + czWord + "','" + enWord + "','" + czPhrase + "','" + enPhrase + "','" + wordType + "','" + phraseType + "\n\t\t','" + type + "','" + gender + "','" + verbAspect + "','" + notes + "','" + enNotes + "','" + czNotes + "', @insert_id);";
        }
        if (isValid()) {
            mysql.createConnection({
                host: config.DB_HOST,
                user: config.DB_USER,
                password: config.DB_PASS,
                database: config.DB_NAME,
                multipleStatements: true
            }).query(getQuery(), function (err, rows) {
                if (err) {
                    res.header("Access-Control-Allow-Origin", "*");
                    res.status(500).send({ error: err });
                    return;
                }
                res.header("Access-Control-Allow-Origin", "*");
                res.json(rows);
            });
        }
        else {
            res.header("Access-Control-Allow-Origin", "*").status(400).send("invalid params");
        }
    };
    IndexController.prototype.index = function (req, res, next) {
        res.render('index', { title: 'Express' });
    };
    IndexController.prototype.msg = function (req, res) {
        res.json({ msg: 'Hello!' });
    };
    return IndexController;
}());
exports.default = IndexController;
exports.indexController = new IndexController();
//# sourceMappingURL=index.server.controller.js.map