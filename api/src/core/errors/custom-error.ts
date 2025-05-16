export class CustomError extends Error {
	public statusCode: number;
	public errors: string[];

	constructor(statusCode: number, message: string[] | string) {
		super(message instanceof Array ? message[0] : message);
		this.name = "CustomError";
		this.statusCode = statusCode;
		this.errors = Array.isArray(message) ? message : [message];
	}
}
