"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var OAuth2Client = require('google-auth-library').OAuth2Client;
var mysql = __importStar(require("mysql"));
var config = {
    SERVER_PORT: process.env.CZAPP_SERVER_PORT,
    DB_HOST: process.env.CZAPP_DB_HOST,
    DB_NAME: process.env.CZAPP_DB_NAME,
    DB_USER: process.env.CZAPP_DB_USER,
    DB_PASS: process.env.CZAPP_DB_PASS
};
var CLIENT_ID = '1076782358657-ek02t3rpa2e7e1kll0pntvl7li7jo827.apps.googleusercontent.com';
var client = new OAuth2Client(CLIENT_ID);
function formatEnum(str) {
    if (str !== null && str !== undefined)
        return str.toUpperCase();
    else
        return '';
}
var LexemeController = /** @class */ (function () {
    function LexemeController() {
        this.lexemes = this.lexemes.bind(this);
    }
    LexemeController.prototype.lexemes = function (req, res, next) {
        function isValid() {
            client.verifyIdToken({
                idToken: req.body.idToken,
                audience: CLIENT_ID,
            }, function (err, login) {
                var sub = login.getPayload().sub;
                if (!sub) {
                    res
                        .header('Access-Control-Allow-Origin', '*')
                        .status(403).send('Invalid token');
                    return;
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
            var notes = req.body.notes || '';
            var czNotes = req.body.czNotes || '';
            var enNotes = req.body.enNotes || '';
            var czWord = '';
            var czPhrase = '';
            var enWord = '';
            var enPhrase = '';
            if (type === 'WORD') {
                czWord = req.body.czText;
                enWord = req.body.enText;
            }
            else {
                czPhrase = req.body.czText;
                enPhrase = req.body.enText;
            }
            return "CALL insertLexemePair('" + czWord + "','" + enWord + "','" + czPhrase + "','" + enPhrase + "','" + wordType + "','" + phraseType + "\n\t\t','" + type + "','" + gender + "','" + verbAspect + "','" + notes + "','" + enNotes + "','" + czNotes + "', @insert_id);";
        }
        if (isValid())
            mysql.createConnection({
                host: config.DB_HOST,
                user: config.DB_USER,
                password: config.DB_PASS,
                database: config.DB_NAME,
                multipleStatements: true
            }).query(getQuery(), function (err, rows) {
                if (err) {
                    res.header('Access-Control-Allow-Origin', '*');
                    res.status(500).send({ error: err });
                    return;
                }
                res.header('Access-Control-Allow-Origin', '*');
                res.json(rows);
            });
        else
            res.header('Access-Control-Allow-Origin', '*').status(400).send('invalid params');
    };
    LexemeController.prototype.index = function (req, res, next) {
        res.json({ title: 'Express' });
    };
    LexemeController.prototype.msg = function (req, res) {
        res.json({ msg: 'Hello!' });
    };
    return LexemeController;
}());
exports.default = LexemeController;
