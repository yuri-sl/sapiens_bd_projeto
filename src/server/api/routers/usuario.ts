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
        fotousuario: z.string().nullable().optional(),      }),
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
  cadastrarAlunoProcedure: publicProcedure.input(
    z.object({
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
      fotousuario: z.string().nullable().optional(),    })
  ).mutation(async ({ input, ctx }) => {
    try {
      const fotoBuffer = input.fotousuario
        ? Buffer.from(input.fotousuario, "base64")
        : null;
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
          $10::INT,
          $11::BYTEA
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
        input.idbolsa ?? null,
        fotoBuffer
      );
    } catch (error) {
      console.error("Erro ao executar cadastrar_aluno:", error);
      throw new Error("Erro ao cadastrar aluno.");
    }
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
    fotousuario: z.string().nullable().optional(),
    idArea: z.number(),
  }))
  .mutation(async ({ input, ctx }) => {
    try {
      const fotoBuffer = input.fotousuario
      ? Buffer.from(input.fotousuario, "base64")
      : null;
      await ctx.db.$executeRaw`
      SELECT cadastrar_professor(
        ${input.matricula}::INT,
        ${input.nome}::VARCHAR,
        ${input.cpf}::VARCHAR,
        ${input.email}::VARCHAR,
        ${input.senha}::VARCHAR,
        ${input.titulo}::VARCHAR,
        ${input.cargaHoraria}::INT,
        ${fotoBuffer}::BYTEA,
        ${input.idArea}::INT
      )
    `;

    } catch (error) {
      console.error("Erro ao cadastrar professor:", error);
      throw new Error("Erro ao cadastrar professor.");
    }
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
  atualizarProfessorProcedure: publicProcedure
  .input(z.object({
    matricula: z.number(),
    nome: z.string(),
    cpf: z.string(),
    email: z.string().email(),
    senha: z.string(),
    titulo: z.string(),
    cargaHoraria: z.number(),
    fotousuario: z.string().nullable().optional(),
    idAreaAntiga: z.number().nullable().optional(),
    idAreaNova: z.number().nullable().optional()
  }))
  .mutation(async ({ input, ctx }) => {
    const fotoBufferProf = input.fotousuario ? Buffer.from(input.fotousuario,"base64") : undefined;
    
    // atualizações em Usuário e Professor
    await ctx.db.usuario.update({
      where: { matricula: input.matricula },
      data: {
        nome: input.nome,
        cpf: input.cpf,
        email: input.email,
        senha: input.senha,
        fotousuario: fotoBufferProf,
      },
    });

    await ctx.db.professor.update({
      where: { idusuario: input.matricula },
      data: {
        titulo: input.titulo,
        cargahoraria: input.cargaHoraria,
      },
    });
    
    // Verificando aqui se a área de ID idAreaNova existe
    if (input.idAreaNova != null) {
      const novaAreaExiste = await ctx.db.area.findUnique({
        where: {
          idarea: input.idAreaNova,
        },
      });

      if (!novaAreaExiste) {
        throw new Error(`Área com ID ${input.idAreaNova} não existe!`);
      }
    
      // Se a área procurada existe, então apago vínculo antigo e coloco o novo

      if (input.idAreaAntiga != null) {
        await ctx.db.atuar.delete({
          where: {
            idarea_idprofessor: {
              idarea: input.idAreaAntiga,
              idprofessor: input.matricula,
            },
          },
        });
      }
      
      await ctx.db.atuar.create({
        data: {
          idarea: input.idAreaNova,
          idprofessor: input.matricula,
        },
      });
    }
  }),
  atualizarAlunoProcedure: publicProcedure
  .input(z.object({
    matricula: z.number(),
    nome: z.string(),
    cpf: z.string(),
    email: z.string().email(),
    senha: z.string(),
    curso: z.string(),
    ira: z.number(),
    data_ingresso: z.string(),
  }))
  .mutation(async ({ input, ctx }) => {
    await ctx.db.usuario.update({
      where: { matricula: input.matricula },
      data: {
        nome: input.nome,
        cpf: input.cpf,
        email: input.email,
        senha: input.senha,
      },
    });

    await ctx.db.aluno.update({
      where: { idusuario: input.matricula },
      data: {
        curso: input.curso,
        ira: input.ira,
        data_ingresso: new Date(input.data_ingresso),
      },
    });
  }),
  atualizarUsuarioProcedure: publicProcedure
  .input(z.object({
    matricula: z.number(),
    nome: z.string(),
    cpf: z.string(),
    email: z.string().email(),
    senha: z.string(),
    fotousuario: z.string().nullable().optional(),
  }))
  .mutation(async ({ input, ctx }) => {
    try {
      const fotoBufferUsuario = input.fotousuario
        ? Buffer.from(input.fotousuario, "base64")
        : null;

      await ctx.db.usuario.update({
        where: { matricula: input.matricula },
        data: {
          nome: input.nome,
          cpf: input.cpf,
          email: input.email,
          senha: input.senha,
          fotousuario: fotoBufferUsuario ?? undefined, // evita sobrescrever com null se não enviado
        },
      });
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      throw new Error("Falha ao atualizar os dados do usuário.");
    }
  }),
});



// atualizarProfessorProcedure: publicProcedure
//   .input(z.object({
//     matricula: z.number(),
//     nome: z.string(),
//     cpf: z.string(),
//     email: z.string().email(),
//     senha: z.string(),
//     titulo: z.string(),
//     cargaHoraria: z.number(),
//     fotousuario: z.string().nullable().optional(),
//     idAreaAntiga: z.number(),
//     idAreaNova: z.number()
//   }))
//   .mutation(async ({ input, ctx }) => {
//     try {
//       const fotoBufferProf = input.fotousuario ? Buffer.from(input.fotousuario,"base64") : null
//       await ctx.db.$executeRawUnsafe(`
//         SELECT atualizar_professor(
//           $1::INT,
//           $2::VARCHAR,
//           $3::VARCHAR,
//           $4::VARCHAR,
//           $5::VARCHAR,
//           $6::VARCHAR,
//           $7::INT,
//           $8::BYTEA
//         )
//       `,
//         input.matricula,
//         input.nome,
//         input.cpf,
//         input.email,
//         input.senha,
//         input.titulo,
//         input.cargaHoraria,
//         fotoBufferProf
//       );
//     } catch (error) {
//       console.error("Erro ao atualizar professor:", error);
//       throw new Error("Falha ao atualizar os dados do professor.");
//     }
//   }),