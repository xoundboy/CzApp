"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bodyParser = require("body-parser");
var config_1 = require("./config");
var cookieParser = require("cookie-parser");
var express = require("express");
var logger = require("morgan");
var path = require("path");
var mongoose = require("mongoose");
var cors = require("cors");
function default_1(db) {
    var app = express();
    //Models
    for (var _i = 0, _a = config_1.default.globFiles(config_1.default.models); _i < _a.length; _i++) {
        var model = _a[_i];
        require(path.resolve(model));
    }
    if (config_1.default.useMongo) {
        mongoose.connect(config_1.default.mongodb, {
            promiseLibrary: global.Promise
        }).catch(function () { console.log("Error connecting to mongos"); });
    }
    // view engine setup
    app.set("views", path.join(__dirname, "../../src/views"));
    app.set("view engine", "jade");
    //app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
    app.use(logger("dev"));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(cors());
    app.use(express.static(path.join(__dirname, "../../src/public")));
    //Routes
    var globFiles = config_1.default.globFiles(config_1.default.routes);
    for (var _b = 0, globFiles_1 = globFiles; _b < globFiles_1.length; _b++) {
        var route = globFiles_1[_b];
        require(path.resolve(route)).default(app);
    }
    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
        var err = new Error("Not Found");
        next(err);
    });
    // production error handler
    app.use(function (err, req, res, next) {
        res.status(err.status || 500).render("error", {
            message: err.message,
            error: {}
        });
    });
    if (app.get("env") === "development") {
        app.use(function (err, req, res, next) {
            res.status(500).render("error", {
                message: err.message,
                error: err
            });
        });
    }
    return app;
}
exports.default = default_1;
;
//# sourceMappingURL=express.js.map