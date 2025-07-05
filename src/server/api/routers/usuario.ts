import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";

export const usuarioRouter = createTRPCRouter({
  getAll: publicProcedure.query(async () => {
    return db.usuario.findMany();
  }),

  create: publicProcedure
    .input(
      z.object({
        nome: z.string(),
        cpf: z.string(),
        email: z.string().email(),
        senha: z.string(),
        matricula: z.number(),
        fotousuario: z.instanceof(Buffer).optional(),
      }),
    )
    .mutation(async ({ input }) => {
      return db.usuario.create({ data: input });
    }),
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.usuario.findMany({
      include: {
        aluno: true,
      },
    });
  }),
  listarProfessoresView: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.$queryRaw`
      SELECT * FROM vw_professores
    `;
  }),
  listarAlunosView: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.$queryRaw`
      SELECT * FROM vw_alunos
    `;
  }),
  cadastrarAlunoProcedure: publicProcedure
  .input(z.object({
    matricula: z.number(),
    nome: z.string(),
    cpf: z.string(),
    email: z.string().email(),
    senha: z.string(),
    curso: z.string(),
    ira: z.number(),
    data_ingresso: z.string(), // precisa ser string ISO
    idpesquisa: z.number().nullable().optional(),
    idbolsa: z.number().nullable().optional(),
  }))
  .mutation(async ({ input, ctx }) => {
    await ctx.db.$executeRawUnsafe(`
      SELECT cadastrar_aluno(
        $1::INT,
        $2::VARCHAR,
        $3::VARCHAR,
        $4::VARCHAR,
        $5::VARCHAR,
        $6::VARCHAR,
        $7::NUMERIC,
        $8::DATE,
        $9::INT,
        $10::INT
      )
    `, 
    input.matricula,
    input.nome,
    input.cpf,
    input.email,
    input.senha,
    input.curso,
    input.ira,
    input.data_ingresso,
    input.idpesquisa ?? null,
    input.idbolsa ?? null);
  }),
  cadastrarProfessorProcedure: publicProcedure
  .input(z.object({
    matricula: z.number(),
    nome: z.string(),
    cpf: z.string(),
    email: z.string().email(),
    senha: z.string(),
    titulo: z.string(),
    cargaHoraria: z.number(),
  }))
  .mutation(async ({ input, ctx }) => {
    await ctx.db.$executeRaw`
      SELECT cadastrar_professor(
        ${input.matricula},
        ${input.nome},
        ${input.cpf},
        ${input.email},
        ${input.senha},
        ${input.titulo},
        ${input.cargaHoraria}
      )
    `;
  }),
  deletarAluno: publicProcedure
  .input(z.object({ matricula: z.number() }))
  .mutation(async ({ ctx, input }) => {
    await ctx.db.aluno.deleteMany({
      where: { idusuario: input.matricula },
    });

    await ctx.db.usuario.delete({
      where: { matricula: input.matricula },
    });
  }),
  deletarProfessor: publicProcedure
  .input(z.object({ matricula: z.number() }))
  .mutation(async ({ ctx, input }) => {
    await ctx.db.professor.delete({
      where: { idusuario: input.matricula },
    });

    await ctx.db.usuario.delete({
      where: { matricula: input.matricula },
    });
  }),





});
