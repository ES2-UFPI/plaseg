-- AddForeignKey
ALTER TABLE "requested_itens" ADD CONSTRAINT "requested_itens_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;
