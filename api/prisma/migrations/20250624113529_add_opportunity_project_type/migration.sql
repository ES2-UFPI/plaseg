-- CreateTable
CREATE TABLE "opportunity_project_types" (
    "id" TEXT NOT NULL,
    "opportunityId" TEXT NOT NULL,
    "projectTypeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "opportunity_project_types_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "opportunity_project_types_opportunityId_projectTypeId_key" ON "opportunity_project_types"("opportunityId", "projectTypeId");

-- AddForeignKey
ALTER TABLE "opportunity_project_types" ADD CONSTRAINT "opportunity_project_types_opportunityId_fkey" FOREIGN KEY ("opportunityId") REFERENCES "opportunities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "opportunity_project_types" ADD CONSTRAINT "opportunity_project_types_projectTypeId_fkey" FOREIGN KEY ("projectTypeId") REFERENCES "project_types"("id") ON DELETE CASCADE ON UPDATE CASCADE;
