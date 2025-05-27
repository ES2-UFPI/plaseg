/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `opportunities` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `responsibleAgency` to the `opportunities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `opportunities` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "opportunities" DROP CONSTRAINT "opportunities_typeId_fkey";

-- AlterTable
ALTER TABLE "opportunities" ADD COLUMN     "releasedForAll" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "responsibleAgency" TEXT NOT NULL,
ADD COLUMN     "slug" TEXT NOT NULL,
ALTER COLUMN "counterpartPercentage" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "opportunities_slug_key" ON "opportunities"("slug");

-- AddForeignKey
ALTER TABLE "opportunities" ADD CONSTRAINT "opportunities_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "types"("id") ON DELETE CASCADE ON UPDATE CASCADE;
