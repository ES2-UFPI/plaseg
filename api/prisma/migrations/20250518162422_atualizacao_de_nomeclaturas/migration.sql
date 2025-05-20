-- DropForeignKey
ALTER TABLE "allocation_departments" DROP CONSTRAINT "allocation_departments_municipalityId_fkey";

-- DropForeignKey
ALTER TABLE "maintenance_contracts" DROP CONSTRAINT "maintenance_contracts_municipalityId_fkey";

-- DropForeignKey
ALTER TABLE "managements" DROP CONSTRAINT "managements_municipalityId_fkey";

-- DropForeignKey
ALTER TABLE "project_partnerships" DROP CONSTRAINT "project_partnerships_municipalityId_fkey";

-- DropForeignKey
ALTER TABLE "qualified_staffs" DROP CONSTRAINT "qualified_staffs_municipalityId_fkey";

-- AddForeignKey
ALTER TABLE "allocation_departments" ADD CONSTRAINT "allocation_departments_municipalityId_fkey" FOREIGN KEY ("municipalityId") REFERENCES "municipalities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenance_contracts" ADD CONSTRAINT "maintenance_contracts_municipalityId_fkey" FOREIGN KEY ("municipalityId") REFERENCES "municipalities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "qualified_staffs" ADD CONSTRAINT "qualified_staffs_municipalityId_fkey" FOREIGN KEY ("municipalityId") REFERENCES "municipalities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_partnerships" ADD CONSTRAINT "project_partnerships_municipalityId_fkey" FOREIGN KEY ("municipalityId") REFERENCES "municipalities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "managements" ADD CONSTRAINT "managements_municipalityId_fkey" FOREIGN KEY ("municipalityId") REFERENCES "municipalities"("id") ON DELETE CASCADE ON UPDATE CASCADE;
