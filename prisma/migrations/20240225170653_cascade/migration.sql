-- DropForeignKey
ALTER TABLE "favorite" DROP CONSTRAINT "favorite_project_id_fkey";

-- DropForeignKey
ALTER TABLE "project" DROP CONSTRAINT "project_owner_id_fkey";

-- DropForeignKey
ALTER TABLE "project_collaboratorion" DROP CONSTRAINT "project_collaboratorion_project_id_fkey";

-- DropForeignKey
ALTER TABLE "project_collaboratorion" DROP CONSTRAINT "project_collaboratorion_user_id_fkey";

-- DropForeignKey
ALTER TABLE "project_item" DROP CONSTRAINT "project_item_project_id_fkey";

-- DropForeignKey
ALTER TABLE "task" DROP CONSTRAINT "task_project_item_id_fkey";

-- AddForeignKey
ALTER TABLE "project" ADD CONSTRAINT "project_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_collaboratorion" ADD CONSTRAINT "project_collaboratorion_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_collaboratorion" ADD CONSTRAINT "project_collaboratorion_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_item" ADD CONSTRAINT "project_item_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_project_item_id_fkey" FOREIGN KEY ("project_item_id") REFERENCES "project_item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorite" ADD CONSTRAINT "favorite_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
