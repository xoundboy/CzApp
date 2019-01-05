"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_server_controller_1 = require("../controllers/index.server.controller");
var IndexRoute = /** @class */ (function () {
    function IndexRoute(app) {
        app.route("/")
            .get(index_server_controller_1.indexController.index);
        //app.route("/lexemes")
        //.post(indexController.lexemes);
        app.route("/msg")
            .get(index_server_controller_1.indexController.msg);
    }
    return IndexRoute;
}());
exports.default = IndexRoute;
//# sourceMappingURL=index.server.route.js.map