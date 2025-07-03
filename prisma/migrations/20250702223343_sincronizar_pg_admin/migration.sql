-- CreateTable
CREATE TABLE "Usuario" (
    "matricula" SERIAL NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "cpf" VARCHAR(14) NOT NULL,
    "email" VARCHAR(30) NOT NULL,
    "senha" VARCHAR(20) NOT NULL,
    "fotousuario" BYTEA,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("matricula")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_cpf_email_key" ON "Usuario"("cpf", "email");
