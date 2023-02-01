import { CustomError } from "./custom-error";

export class BadPathError extends CustomError {
	statusCode = 404;

	constructor() {
		super("Could not find path...");

		Object.setPrototypeOf(this, BadPathError.prototype);
	}

	formatError() {
		return [
			{ message: 'Not found...' }
		]
	}
}