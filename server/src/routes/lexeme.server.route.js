"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_server_controller_1 = require("../controllers/index.server.controller");
var LexemeRoute = /** @class */ (function () {
    function LexemeRoute(app) {
        //app.route("/")
        //.get(indexController.index);
        app.route("/lexemes")
            .post(index_server_controller_1.indexController.lexemes);
        //app.route("/msg")
        //.get(indexController.msg);
    }
    return LexemeRoute;
}());
exports.default = LexemeRoute;
//# sourceMappingURL=lexeme.server.route.js.map