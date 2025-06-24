-- CreateTable
CREATE TABLE "requested_itens" (
    "id" TEXT NOT NULL,
    "quantity" DECIMAL(65,30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "baseProductId" TEXT NOT NULL,
    "allocationDepartmentId" TEXT,
    "maintenanceContractId" TEXT,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "requested_itens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "projects" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "responsibleCpf" TEXT,
    "responsibleName" TEXT,
    "responsibleEmail" TEXT,
    "responsiblePhone" TEXT,
    "counterpartCapitalItem" TEXT,
    "counterpartCapitalValue" DECIMAL(65,30),
    "counterpartOperatingCostCode" TEXT,
    "counterpartOperatingCostValue" DECIMAL(65,30),
    "totalValue" DECIMAL(65,30),
    "requestedValue" DECIMAL(65,30),
    "baseValue" DECIMAL(65,30),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "projectTypeId" TEXT NOT NULL,
    "opportunityId" TEXT NOT NULL,
    "municipalityId" TEXT NOT NULL,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_DocumentToProject" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_DocumentToProject_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_DocumentToProject_B_index" ON "_DocumentToProject"("B");

-- AddForeignKey
ALTER TABLE "requested_itens" ADD CONSTRAINT "requested_itens_baseProductId_fkey" FOREIGN KEY ("baseProductId") REFERENCES "base_products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "requested_itens" ADD CONSTRAINT "requested_itens_allocationDepartmentId_fkey" FOREIGN KEY ("allocationDepartmentId") REFERENCES "allocation_departments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "requested_itens" ADD CONSTRAINT "requested_itens_maintenanceContractId_fkey" FOREIGN KEY ("maintenanceContractId") REFERENCES "maintenance_contracts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "requested_itens" ADD CONSTRAINT "requested_itens_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_projectTypeId_fkey" FOREIGN KEY ("projectTypeId") REFERENCES "project_types"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_opportunityId_fkey" FOREIGN KEY ("opportunityId") REFERENCES "opportunities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_municipalityId_fkey" FOREIGN KEY ("municipalityId") REFERENCES "municipalities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DocumentToProject" ADD CONSTRAINT "_DocumentToProject_A_fkey" FOREIGN KEY ("A") REFERENCES "documents"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DocumentToProject" ADD CONSTRAINT "_DocumentToProject_B_fkey" FOREIGN KEY ("B") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;
