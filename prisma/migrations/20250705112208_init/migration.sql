/*
  Warnings:

  - You are about to drop the `Departamento` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Usuario` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Departamento";

-- DropTable
DROP TABLE "Usuario";

-- CreateTable
CREATE TABLE "departamento" (
    "id_dep" SERIAL NOT NULL,
    "nome" VARCHAR(100),

    CONSTRAINT "departamento_pkey" PRIMARY KEY ("id_dep")
);

-- CreateTable
CREATE TABLE "usuario" (
    "matricula" INTEGER NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "cpf" VARCHAR(14) NOT NULL,
    "email" VARCHAR(30) NOT NULL,
    "senha" VARCHAR(20) NOT NULL,
    "fotousuario" BYTEA,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("matricula")
);

-- CreateTable
CREATE TABLE "aluno" (
    "curso" VARCHAR(100) NOT NULL,
    "ira" DOUBLE PRECISION NOT NULL,
    "data_ingresso" DATE NOT NULL,
    "idpesquisa" INTEGER,
    "idbolsa" INTEGER,
    "idusuario" INTEGER NOT NULL,

    CONSTRAINT "aluno_pkey" PRIMARY KEY ("idusuario")
);

-- CreateTable
CREATE TABLE "abrange" (
    "isbn" VARCHAR(20) NOT NULL,
    "idarea" INTEGER NOT NULL,

    CONSTRAINT "abrange_pkey" PRIMARY KEY ("isbn","idarea")
);

-- CreateTable
CREATE TABLE "area" (
    "idarea" SERIAL NOT NULL,
    "nomearea" VARCHAR(100) NOT NULL,

    CONSTRAINT "area_pkey" PRIMARY KEY ("idarea")
);

-- CreateTable
CREATE TABLE "atuar" (
    "idarea" INTEGER NOT NULL,
    "idprofessor" INTEGER NOT NULL,

    CONSTRAINT "atuar_pkey" PRIMARY KEY ("idarea","idprofessor")
);

-- CreateTable
CREATE TABLE "bolsa" (
    "valor_bolsa" DOUBLE PRECISION NOT NULL,
    "idbolsa" SERIAL NOT NULL,

    CONSTRAINT "bolsa_pkey" PRIMARY KEY ("idbolsa")
);

-- CreateTable
CREATE TABLE "coordenador" (
    "inicio_coordenador" INTEGER,
    "fimmandato" DATE NOT NULL,
    "iddepartamento" INTEGER NOT NULL,
    "idusuario" INTEGER NOT NULL,

    CONSTRAINT "coordenador_pkey" PRIMARY KEY ("idusuario")
);

-- CreateTable
CREATE TABLE "disponibiliza" (
    "id_dep" INTEGER NOT NULL,
    "idbolsa" INTEGER NOT NULL,

    CONSTRAINT "disponibiliza_pkey" PRIMARY KEY ("id_dep","idbolsa")
);

-- CreateTable
CREATE TABLE "especialidade" (
    "idespecialidade" SERIAL NOT NULL,
    "nomeespecialidade" VARCHAR(200) NOT NULL,

    CONSTRAINT "especialidade_pkey" PRIMARY KEY ("idespecialidade")
);

-- CreateTable
CREATE TABLE "oferece" (
    "id_dep" INTEGER NOT NULL,
    "idpesquisa" INTEGER NOT NULL,

    CONSTRAINT "oferece_pkey" PRIMARY KEY ("id_dep","idpesquisa")
);

-- CreateTable
CREATE TABLE "pertence" (
    "id_dep" INTEGER NOT NULL,
    "matricula" INTEGER NOT NULL,

    CONSTRAINT "pertence_pkey" PRIMARY KEY ("id_dep","matricula")
);

-- CreateTable
CREATE TABLE "pertence1" (
    "idespecialidade" INTEGER NOT NULL,
    "idpesquisa" INTEGER NOT NULL,

    CONSTRAINT "pertence1_pkey" PRIMARY KEY ("idespecialidade","idpesquisa")
);

-- CreateTable
CREATE TABLE "pesquisa" (
    "idpesquisa" SERIAL NOT NULL,
    "datainicio" DATE NOT NULL,
    "datafim" DATE NOT NULL,
    "titulopesquisa" VARCHAR(300) NOT NULL,
    "relatorio" BYTEA,
    "estadopesquisa" VARCHAR(50),
    "vagasvoluntarias" INTEGER NOT NULL,
    "vagasremuneradas" INTEGER NOT NULL,

    CONSTRAINT "pesquisa_pkey" PRIMARY KEY ("idpesquisa")
);

-- CreateTable
CREATE TABLE "professor" (
    "titulo" VARCHAR(100),
    "cargahoraria" INTEGER,
    "idusuario" INTEGER NOT NULL,

    CONSTRAINT "professor_pkey" PRIMARY KEY ("idusuario")
);

-- CreateTable
CREATE TABLE "publica" (
    "isbn" VARCHAR(20) NOT NULL,
    "idpesquisa" INTEGER NOT NULL,

    CONSTRAINT "publica_pkey" PRIMARY KEY ("isbn","idpesquisa")
);

-- CreateTable
CREATE TABLE "realiza" (
    "idpesquisa" INTEGER NOT NULL,
    "idprofessor" INTEGER NOT NULL,

    CONSTRAINT "realiza_pkey" PRIMARY KEY ("idpesquisa","idprofessor")
);

-- CreateTable
CREATE TABLE "revista" (
    "isbn" VARCHAR(20) NOT NULL,
    "titulo" VARCHAR(100) NOT NULL,
    "datapublicacao" DATE NOT NULL,

    CONSTRAINT "revista_pkey" PRIMARY KEY ("isbn")
);

-- CreateTable
CREATE TABLE "solicita_pesquisa" (
    "idprofessor" INTEGER NOT NULL,
    "id_dep" INTEGER NOT NULL,

    CONSTRAINT "solicita_pesquisa_pkey" PRIMARY KEY ("idprofessor","id_dep")
);

-- CreateTable
CREATE TABLE "tem" (
    "idarea" INTEGER NOT NULL,
    "id_dep" INTEGER NOT NULL,

    CONSTRAINT "tem_pkey" PRIMARY KEY ("idarea","id_dep")
);

-- CreateTable
CREATE TABLE "tem1" (
    "idarea" INTEGER NOT NULL,
    "idespecialidade" INTEGER NOT NULL,

    CONSTRAINT "tem1_pkey" PRIMARY KEY ("idarea","idespecialidade")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_cpf_email_key" ON "usuario"("cpf", "email");

-- AddForeignKey
ALTER TABLE "aluno" ADD CONSTRAINT "aluno_idbolsa_fkey" FOREIGN KEY ("idbolsa") REFERENCES "bolsa"("idbolsa") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "aluno" ADD CONSTRAINT "aluno_idpesquisa_fkey" FOREIGN KEY ("idpesquisa") REFERENCES "pesquisa"("idpesquisa") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "aluno" ADD CONSTRAINT "aluno_idusuario_fkey" FOREIGN KEY ("idusuario") REFERENCES "usuario"("matricula") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "abrange" ADD CONSTRAINT "abrange_idarea_fkey" FOREIGN KEY ("idarea") REFERENCES "area"("idarea") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "abrange" ADD CONSTRAINT "abrange_isbn_fkey" FOREIGN KEY ("isbn") REFERENCES "revista"("isbn") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "atuar" ADD CONSTRAINT "atuar_idarea_fkey" FOREIGN KEY ("idarea") REFERENCES "area"("idarea") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "atuar" ADD CONSTRAINT "atuar_idprofessor_fkey" FOREIGN KEY ("idprofessor") REFERENCES "professor"("idusuario") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "coordenador" ADD CONSTRAINT "coordenador_iddepartamento_fkey" FOREIGN KEY ("iddepartamento") REFERENCES "departamento"("id_dep") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "coordenador" ADD CONSTRAINT "coordenador_idusuario_fkey" FOREIGN KEY ("idusuario") REFERENCES "usuario"("matricula") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "disponibiliza" ADD CONSTRAINT "disponibiliza_id_dep_fkey" FOREIGN KEY ("id_dep") REFERENCES "departamento"("id_dep") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "disponibiliza" ADD CONSTRAINT "disponibiliza_idbolsa_fkey" FOREIGN KEY ("idbolsa") REFERENCES "bolsa"("idbolsa") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "oferece" ADD CONSTRAINT "oferece_id_dep_fkey" FOREIGN KEY ("id_dep") REFERENCES "departamento"("id_dep") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "oferece" ADD CONSTRAINT "oferece_idpesquisa_fkey" FOREIGN KEY ("idpesquisa") REFERENCES "pesquisa"("idpesquisa") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pertence1" ADD CONSTRAINT "pertence1_idespecialidade_fkey" FOREIGN KEY ("idespecialidade") REFERENCES "especialidade"("idespecialidade") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pertence1" ADD CONSTRAINT "pertence1_idpesquisa_fkey" FOREIGN KEY ("idpesquisa") REFERENCES "pesquisa"("idpesquisa") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "professor" ADD CONSTRAINT "professor_idusuario_fkey" FOREIGN KEY ("idusuario") REFERENCES "usuario"("matricula") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "publica" ADD CONSTRAINT "publica_idpesquisa_fkey" FOREIGN KEY ("idpesquisa") REFERENCES "pesquisa"("idpesquisa") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "publica" ADD CONSTRAINT "publica_isbn_fkey" FOREIGN KEY ("isbn") REFERENCES "revista"("isbn") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "realiza" ADD CONSTRAINT "realiza_idpesquisa_fkey" FOREIGN KEY ("idpesquisa") REFERENCES "pesquisa"("idpesquisa") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "realiza" ADD CONSTRAINT "realiza_idprofessor_fkey" FOREIGN KEY ("idprofessor") REFERENCES "professor"("idusuario") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "solicita_pesquisa" ADD CONSTRAINT "solicita_pesquisa_id_dep_fkey" FOREIGN KEY ("id_dep") REFERENCES "departamento"("id_dep") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "solicita_pesquisa" ADD CONSTRAINT "solicita_pesquisa_idprofessor_fkey" FOREIGN KEY ("idprofessor") REFERENCES "professor"("idusuario") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tem" ADD CONSTRAINT "tem_idarea_fkey" FOREIGN KEY ("idarea") REFERENCES "area"("idarea") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tem1" ADD CONSTRAINT "tem1_idarea_fkey" FOREIGN KEY ("idarea") REFERENCES "area"("idarea") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tem1" ADD CONSTRAINT "tem1_idespecialidade_fkey" FOREIGN KEY ("idespecialidade") REFERENCES "especialidade"("idespecialidade") ON DELETE NO ACTION ON UPDATE NO ACTION;
