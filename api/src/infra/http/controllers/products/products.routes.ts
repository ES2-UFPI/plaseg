import { FastifyInstance } from "fastify";
import { createBaseProduct } from "./create-base-product.controller";

export async function productsRoutes(app: FastifyInstance) {
	app.register(createBaseProduct);
}
