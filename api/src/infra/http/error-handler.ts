import type { FastifyInstance } from "fastify";
import { ZodError } from "zod";
import { CustomError } from "../../core/errors/custom-error";
import type { FastifySchemaValidationError } from "fastify/types/schema";

type FastifyErrorHandler = FastifyInstance["errorHandler"];

export const errorHandler: FastifyErrorHandler = async (error, _, reply) => {
	console.log(error);

	if (error instanceof ZodError) {
		return reply.status(400).send({
			success: false,
			errors: error.validation ? error.validation[0].message : [],
			data: null,
		});
	}

	if (error instanceof CustomError) {
		return reply.status(error.statusCode).send({
			success: false,
			errors: [error.errors[0]],
			data: null,
		});
	}

	if (error instanceof Error && "statusCode" in error) {
		const statusCode = error.statusCode || 500;
		const errors = error.validation?.map(
			(e: FastifySchemaValidationError) => e.message
		);

		return reply.status(statusCode).send({
			success: false,
			errors,
			data: null,
		});
	}

	reply.status(500).send({
		success: false,
		errors: ["Internal Server Error"],
		data: null,
	});
};
