import { CustomError } from "./custom-error";


export class DbConnectionError extends CustomError {
	reason = 'Could not connect to database...';
	statusCode = 500;

	constructor(){
		super("Could not connect to DB...");

		Object.setPrototypeOf(this, DbConnectionError.prototype)
	}

	formatError() {
		return [
			{ message: this.reason }
		]
	}
}