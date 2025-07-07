import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";

export const areaRouter = createTRPCRouter({
  listarAreasView: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.$queryRaw`
      SELECT * FROM vw_area_esp
    `;
  }),

  listarAreas: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.$queryRaw`
      SELECT * FROM area
    `;
  }),

  deletarEspecialidade: publicProcedure
    .input(z.object({idespecialidade: z.number()}))
    .mutation(async ({ ctx, input }) => {
      // Responsável por deletar a referência na tabela de relacionamento entre área e especialidade
      await ctx.db.tem1.deleteMany({
        where: { idespecialidade: input.idespecialidade },
      });

      // Responsável por deletar a referência na tabela de relacionamento entre pesquisa e especialidade
      await ctx.db.pertence1.deleteMany({
        where: { idespecialidade: input.idespecialidade },
      });

      // SE O CRUD DE PESQUISAS FOR CRIADO,TALVEZ SEJA BOM EXCLUIR
      //  AS PESQUISAS ASSOCIADAS À ESPECIALIDADE EXCLUIDA AQUI

      // Responsável por deletar a especialidade solicitada
      await ctx.db.especialidade.delete({
        where: { idespecialidade: input.idespecialidade },
      });
    }),

  deletarArea: publicProcedure
    .input(z.object({idarea: z.number()}))
    .mutation(async ({ctx, input}) => {
      // Responsável por deletar a referência na tabela de relacionamento entre área e especialidade
      await ctx.db.tem1.deleteMany({
        where: { idarea: input.idarea },
      });

      // Responsável por deletar a referência na tabela de relacionamento entre área e departamento
      await ctx.db.tem.deleteMany({
        where: { idarea: input.idarea },
      });

      // Responsável por deletar a referência na tabela de relacionamento entre área e revista
      await ctx.db.abrange.deleteMany({
        where: { idarea: input.idarea },
      });

      // Responsável por deletar a referência na tabela de relacionamento entre área e professor
      await ctx.db.atuar.deleteMany({
        where: { idarea: input.idarea },
      });

      // Responsável por encontrar todas as especialidades relacionadas a área deletada
      const especialidadesDaAreaDeletada = await ctx.db.especialidade.findMany({
        where: {
          tem1: {
            none: {}, 
          },
        },
      });

      // SE O CRUD DE PESQUISAS FOR CRIADO,TALVEZ SEJA BOM EXCLUIR
      //  AS PESQUISAS ASSOCIADAS À ESPECIALIDADE EXCLUIDA AQUI

      // Responsável por apagar o relacionamento de todas as especialidades a serem apagadas com pesquisa
      await ctx.db.pertence1.deleteMany({
        where: {
          idespecialidade: {
            in: especialidadesDaAreaDeletada.map((e) => e.idespecialidade),
          },
        },
      });

      // Responsável por deletar todas as especialidades relacionadas a área deletada
      await ctx.db.especialidade.deleteMany({
      where: {
        idespecialidade: {
          in: especialidadesDaAreaDeletada.map((e) => e.idespecialidade),
        },
      },
    });

      // Responsável por deletar a área solicitada
      await ctx.db.area.delete({
        where: {idarea: input.idarea}
      })
    }),

    cadastrarAreaProcedure: publicProcedure
      .input(z.object({
        nomeArea: z.string(),
        idDep: z.number()
      }))
      .mutation(async ({ input, ctx }) => {
        await ctx.db.$executeRaw`
          SELECT cadastrar_area(
            ${input.nomeArea},
            ${input.idDep}
          )
        `;
      }),

    cadastrarEspecialidadeProcedure: publicProcedure
      .input(z.object({
        nomeEspecialidade: z.string(),
        idArea: z.number()
      }))
      .mutation(async ({ input, ctx }) => {
        await ctx.db.$executeRaw`
          SELECT cadastrar_especialidade(
            ${input.nomeEspecialidade},
            ${input.idArea}
          )
        `;
      })
});