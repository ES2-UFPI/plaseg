import {
	jsonSchemaTransform,
	serializerCompiler,
	validatorCompiler,
	ZodTypeProvider,
} from "fastify-type-provider-zod";
import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";
import fastifyJwt from "@fastify/jwt";
import { errorHandler } from "./error-handler";
import { authRoutes } from "./controllers/auth/auth.routes";
import { adminRoutes } from "./controllers/user/admin.routes";
import { typesRoutes } from "./controllers/types/types.routes";
import { municipalityRoutes } from "./controllers/municipality/municipality.routes";
import { opportunitiesRoutes } from "./controllers/opportunities/opportunity.routes";
import { productsRoutes } from "./controllers/products/products.routes";
import { projectTypesRoutes } from "./controllers/project-type/project-type.routes";
import { projectsRoutes } from "./controllers/project/project.routes";

const version = "1.0.0 - Release 1";

export function buildApp(app = fastify().withTypeProvider<ZodTypeProvider>()) {
	app.setValidatorCompiler(validatorCompiler);
	app.setSerializerCompiler(serializerCompiler);
	app.setErrorHandler(errorHandler);
	app.register(fastifyCors);
	app.register(fastifySwagger, {
		openapi: {
			info: {
				title: `PlaSeg API - ${process.env.NODE_ENV} - [Version: ${version}]`,
				description:
					"API para uma plataforma de criação automatizada de projetos municipais.",
				version: version,
			},
			components: {
				securitySchemes: {
					bearerAuth: {
						type: "http",
						scheme: "bearer",
						bearerFormat: "JWT",
					},
				},
			},
		},
		transform: jsonSchemaTransform,
	});
	app.register(fastifySwaggerUI, {
		routePrefix: "/",
	});
	app.register(fastifyJwt, {
		secret: process.env.JWT_SECRET || "secret",
	});

	app.register(authRoutes);
	app.register(municipalityRoutes);
	app.register(adminRoutes);
	app.register(typesRoutes);
	app.register(opportunitiesRoutes);
	app.register(productsRoutes);
	app.register(projectTypesRoutes);
	app.register(projectsRoutes);

	return app;
}

export const app = buildApp();
