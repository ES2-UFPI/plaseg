import { FastifyReply, FastifyRequest } from "fastify";

export function verifyUserRole(roleToVerify: "ADMIN" | "MUNICIPALITY") {
	return async (request: FastifyRequest, reply: FastifyReply) => {
		try {
			await request.jwtVerify();

			const role = request.user.role;

			if (role !== roleToVerify) {
				return reply.status(401).send({
					success: false,
					errors: ["Usuário não autorizado"],
					data: null,
				});
			}
		} catch (err) {
			return reply.status(401).send({
				success: false,
				errors: ["Usuário não autorizado"],
				data: null,
			});
		}
	};
}
