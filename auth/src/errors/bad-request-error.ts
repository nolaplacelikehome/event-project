import { CustomError } from "./custom-error";

export class BadRequestError extends CustomError {
	statusCode = 400;

	// TS takes public property and saves it to instance of BRE
	// super executed before TS saves ref to message on instance
	constructor(public message: string){
		super(message);

		Object.setPrototypeOf(this, BadRequestError.prototype);
	}

	formatError() {
		return [{ message: this.message }];
	}
}