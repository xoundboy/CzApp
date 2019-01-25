"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mysql = __importStar(require("mysql"));
var Controller_1 = require("./Controller");
var config = {
    SERVER_PORT: process.env.CZAPP_SERVER_PORT,
    DB_HOST: process.env.CZAPP_DB_HOST,
    DB_NAME: process.env.CZAPP_DB_NAME,
    DB_USER: process.env.CZAPP_DB_USER,
    DB_PASS: process.env.CZAPP_DB_PASS
};
function formatEnum(str) {
    if (str !== null && str !== undefined)
        return str.toUpperCase();
    else
        return '';
}
function getQuery(req) {
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
var InsertLexemePair = /** @class */ (function (_super) {
    __extends(InsertLexemePair, _super);
    function InsertLexemePair(req, res, next) {
        const _this = _super.call(this) || this;
        _this.req = req;
        _this.res = res;
        _this.checkToken(_this.onInsertPairAuthenticated);
        return _this;
    }
    InsertLexemePair.prototype.onInsertPairAuthenticated = function (err, login) {
        this.executeInsert();
        const sub = login.getPayload().sub;
        if (!sub) {
            res
                .header('Access-Control-Allow-Origin', '*')
                .status(403).send('Invalid token');
            return;
        }
    };
    InsertLexemePair.prototype.executeInsert = function () {
        mysql.createConnection({
            host: config.DB_HOST,
            user: config.DB_USER,
            password: config.DB_PASS,
            database: config.DB_NAME,
            multipleStatements: true
        }).query(getQuery(req), function (err, rows) {
            if (err) {
                res.header('Access-Control-Allow-Origin', '*');
                res.status(500).send({ error: err });
                return;
            }
            res.header('Access-Control-Allow-Origin', '*');
            res.json(rows);
        });
    };
    return InsertLexemePair;
}(Controller_1.Controller));
exports.default = InsertLexemePair;
