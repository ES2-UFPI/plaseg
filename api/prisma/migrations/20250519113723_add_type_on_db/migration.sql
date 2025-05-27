-- CreateEnum
CREATE TYPE "TypeGroup" AS ENUM ('SERVICE', 'OPPORTUNITY', 'CATEGORY');

-- CreateTable
CREATE TABLE "types" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "group" "TypeGroup" NOT NULL,
    "parentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "types_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "types_description_key" ON "types"("description");

-- AddForeignKey
ALTER TABLE "types" ADD CONSTRAINT "types_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "types"("id") ON DELETE CASCADE ON UPDATE CASCADE;
