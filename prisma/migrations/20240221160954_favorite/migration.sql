-- AlterTable
ALTER TABLE "task" ADD COLUMN     "is_completed" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "favorite" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "project_id" TEXT NOT NULL,

    CONSTRAINT "favorite_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "favorite_id_key" ON "favorite"("id");

-- AddForeignKey
ALTER TABLE "favorite" ADD CONSTRAINT "favorite_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
