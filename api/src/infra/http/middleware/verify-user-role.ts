import { FastifyReply, FastifyRequest } from "fastify";
import { Role, RoleType } from "../../../domain/entities/value-objects/role";

/**
 * Middleware para verificar se o usuário tem a role especificada
 * @param rolesToVerify - A role que o usuário deve ter
 * @returns Um middleware que verifica se o usuário tem a role especificada
 */
export function verifyUserRole(rolesToVerify: RoleType[]) {
	return async (request: FastifyRequest, reply: FastifyReply) => {
		try {
			await request.jwtVerify();

			const role = request.user.role;

			const roleObject = Role.fromString(role);

			if (!rolesToVerify.includes(roleObject.getValue())) {
				return reply.status(401).send({
					success: false,
					errors: ["Não autorizado"],
					data: null,
				});
			}
		} catch (err) {
			return reply.status(401).send({
				success: false,
				errors: ["Não autorizado"],
				data: null,
			});
		}
	};
}
