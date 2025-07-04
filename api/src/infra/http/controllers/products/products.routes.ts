import { FastifyInstance } from "fastify";
import { createBaseProduct } from "./create-base-product.controller";
import { getBaseProduct } from "./get-base-products.controller";
import { createSpecificProduct } from "./create-specific-product.controller";
import { getSpecificProducts } from "./get-specific-products.controller";

export async function productsRoutes(app: FastifyInstance) {
	app.register(createBaseProduct);
	app.register(getBaseProduct);
	app.register(createSpecificProduct);
	app.register(getSpecificProducts);
}
