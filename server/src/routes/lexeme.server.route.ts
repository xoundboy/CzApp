import { Express } from "express";
import { indexController } from "../controllers/index.server.controller";

export default class LexemeRoute {
	constructor(app: Express) {
		//app.route("/")
			//.get(indexController.index);
		app.route("/lexemes")
			.post(indexController.lexemes);
		//app.route("/msg")
			//.get(indexController.msg);
	}
}