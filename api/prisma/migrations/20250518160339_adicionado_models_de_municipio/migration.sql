-- CreateEnum
CREATE TYPE "UnitType" AS ENUM ('UF', 'MUNICIPALITY');

-- CreateEnum
CREATE TYPE "EmploymentType" AS ENUM ('CLT', 'PJ', 'OTHERS');

-- CreateTable
CREATE TABLE "municipalities" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "guardInitialDate" TIMESTAMP(3) NOT NULL,
    "guardCount" INTEGER NOT NULL,
    "trafficInitialDate" TIMESTAMP(3) NOT NULL,
    "trafficCount" INTEGER NOT NULL,
    "federativeUnit" TEXT NOT NULL,
    "unitType" "UnitType" NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "municipalities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "allocation_departments" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "municipalityId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "allocation_departments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "maintenance_contracts" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "attachment" TEXT NOT NULL,
    "municipalityId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "maintenance_contracts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "qualified_staffs" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sector" TEXT NOT NULL,
    "education" TEXT NOT NULL,
    "experience" TEXT NOT NULL,
    "employmentType" "EmploymentType" NOT NULL,
    "document" TEXT NOT NULL,
    "isResponsible" BOOLEAN NOT NULL,
    "municipalityId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "qualified_staffs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_partnerships" (
    "id" TEXT NOT NULL,
    "term" TEXT NOT NULL,
    "agency" TEXT NOT NULL,
    "objective" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "municipalityId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "project_partnerships_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "managements" (
    "id" TEXT NOT NULL,
    "initialDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "managerName" TEXT NOT NULL,
    "managerCpf" TEXT NOT NULL,
    "managerEmail" TEXT NOT NULL,
    "managerAddress" TEXT NOT NULL,
    "managerPhone" TEXT NOT NULL,
    "adminManagerName" TEXT NOT NULL,
    "adminManagerCpf" TEXT NOT NULL,
    "adminManagerEmail" TEXT NOT NULL,
    "adminManagerAddress" TEXT NOT NULL,
    "adminManagerPhone" TEXT NOT NULL,
    "legislationName" TEXT NOT NULL,
    "legislationCpf" TEXT NOT NULL,
    "legislationEmail" TEXT NOT NULL,
    "legislationAddress" TEXT NOT NULL,
    "legislationPhone" TEXT NOT NULL,
    "municipalityId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "managements_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "municipalities_userId_key" ON "municipalities"("userId");

-- AddForeignKey
ALTER TABLE "municipalities" ADD CONSTRAINT "municipalities_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "allocation_departments" ADD CONSTRAINT "allocation_departments_municipalityId_fkey" FOREIGN KEY ("municipalityId") REFERENCES "municipalities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenance_contracts" ADD CONSTRAINT "maintenance_contracts_municipalityId_fkey" FOREIGN KEY ("municipalityId") REFERENCES "municipalities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "qualified_staffs" ADD CONSTRAINT "qualified_staffs_municipalityId_fkey" FOREIGN KEY ("municipalityId") REFERENCES "municipalities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_partnerships" ADD CONSTRAINT "project_partnerships_municipalityId_fkey" FOREIGN KEY ("municipalityId") REFERENCES "municipalities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "managements" ADD CONSTRAINT "managements_municipalityId_fkey" FOREIGN KEY ("municipalityId") REFERENCES "municipalities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
