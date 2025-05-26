-- CreateTable
CREATE TABLE "specific_products" (
    "id" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "unitValue" DECIMAL(65,30) NOT NULL,
    "warrantyMonths" INTEGER NOT NULL,
    "budget" DECIMAL(65,30) NOT NULL,
    "budgetValidity" TIMESTAMP(3) NOT NULL,
    "baseProductId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "specific_products_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "specific_products" ADD CONSTRAINT "specific_products_baseProductId_fkey" FOREIGN KEY ("baseProductId") REFERENCES "base_products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
