"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var glob_1 = require("glob");
var lodash_1 = require("lodash");
var Config = /** @class */ (function () {
    function Config() {
    }
    Config.globFiles = function (location) {
        return lodash_1.union([], glob_1.sync(location));
    };
    Config.port = 3002;
    Config.routes = "./dist/routes/**/*.js";
    Config.models = "./dist/models/**/*.js";
    Config.useMongo = false;
    Config.mongodb = process.env.NODE_ENV === 'docker' ?
        'mongodb://mongo:27017/express-typescript-starter' :
        'mongodb://localhost:27017/express-typescript-starter';
    return Config;
}());
exports.default = Config;
//# sourceMappingURL=config.js.map