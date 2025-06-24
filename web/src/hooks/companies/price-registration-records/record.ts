import { create } from "zustand";
import { persist } from "zustand/middleware";

// Define the RecordProduct type
export interface RecordProduct {
	conversion_rate: number;
	conversion_rate_date: string;
	currency: string;
	maximum_qty_for_membership: number;
	minimum_qty_for_membership: number;
	product_id: string;
	quantity_available: number;
	total_quantity: number;
	total_value_brl: number;
	total_value_currency: number;
	unit: string;
	unit_price_brl: number;
	unit_price_source_currency: number;
}

// Define the store state type
interface RecordProductsState {
	recordProducts: RecordProduct[];
	setRecordProducts: (recordProducts: RecordProduct[]) => void;
	addRecordProduct: (recordProduct: RecordProduct) => void;
	updateRecordProduct: (
		productId: string,
		updatedProduct: Partial<RecordProduct>
	) => void;
	removeRecordProduct: (productId: string) => void;
	clearRecordProducts: () => void;
}

// Create the store with persist middleware to save in localStorage
export const useRecordProductsStore = create<RecordProductsState>()(
	persist(
		(set) => ({
			recordProducts: [],

			// Set the entire record products array
			setRecordProducts: (recordProducts) => set({ recordProducts }),

			// Add a single record product
			addRecordProduct: (recordProduct) =>
				set((state) => ({
					recordProducts: [...state.recordProducts, recordProduct],
				})),

			// Update a specific record product by product_id
			updateRecordProduct: (productId, updatedProduct) =>
				set((state) => ({
					recordProducts: state.recordProducts.map((product) =>
						product.product_id === productId
							? { ...product, ...updatedProduct }
							: product
					),
				})),

			// Remove a record product by product_id
			removeRecordProduct: (productId) =>
				set((state) => ({
					recordProducts: state.recordProducts.filter(
						(product) => product.product_id !== productId
					),
				})),

			// Clear all record products
			clearRecordProducts: () => set({ recordProducts: [] }),
		}),
		{
			name: "record-products-storage", // unique name for localStorage
		}
	)
);
