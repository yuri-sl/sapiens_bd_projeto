/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Post";

-- CreateTable
CREATE TABLE "Departamento" (
    "ID_Dep" SERIAL NOT NULL,
    "Nome" TEXT NOT NULL,

    CONSTRAINT "Departamento_pkey" PRIMARY KEY ("ID_Dep")
);
