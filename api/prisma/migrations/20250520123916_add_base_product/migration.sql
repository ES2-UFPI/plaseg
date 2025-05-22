-- CreateTable
CREATE TABLE "base_products" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "technicalDescription" TEXT NOT NULL,
    "budget1" DECIMAL(65,30) NOT NULL,
    "budget1Validity" TIMESTAMP(3) NOT NULL,
    "budget2" DECIMAL(65,30) NOT NULL,
    "budget2Validity" TIMESTAMP(3) NOT NULL,
    "budget3" DECIMAL(65,30) NOT NULL,
    "budget3Validity" TIMESTAMP(3) NOT NULL,
    "unitValue" DECIMAL(65,30) NOT NULL,
    "typeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "base_products_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "base_products_code_key" ON "base_products"("code");

-- AddForeignKey
ALTER TABLE "base_products" ADD CONSTRAINT "base_products_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "types"("id") ON DELETE CASCADE ON UPDATE CASCADE;
