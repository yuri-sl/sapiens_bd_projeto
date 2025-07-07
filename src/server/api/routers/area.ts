import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";

export const areaRouter = createTRPCRouter({
  listarAreasView: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.$queryRaw`
      SELECT * FROM vw_area_esp
      ORDER BY idarea ASC;
    `;
  }),

  listarAreas: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.$queryRaw`
      SELECT * FROM area
      ORDER BY idarea ASC;
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
          ${input.nomeArea}::VARCHAR,
          ${input.idDep}::INT
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
          ${input.nomeEspecialidade}::VARCHAR,
          ${input.idArea}::INT
        )
      `;
    }),

  editarAreaProcedure: publicProcedure
    .input(z.object({
      idArea: z.number(),
      nomeArea: z.string()
    }))
    .mutation(async ({ input, ctx }) =>  {
      await ctx.db.area.update({
        where: { idarea: input.idArea },
        data: {
          nomearea: input.nomeArea
        },
      })
    }),

  editarEspecialidadeProcedure: publicProcedure
    .input(z.object({
      novoIdArea: z.number(),
      antigoIdArea: z.number(),
      idEspecialidade: z.number(),
      nomeEspecialidade: z.string()
    }))
    .mutation(async ({ input, ctx }) =>  {
      await ctx.db.especialidade.update({
        where: { idespecialidade: input.idEspecialidade },
        data: {
          nomeespecialidade: input.nomeEspecialidade
        },
      })

      // Verificar se existe área para novoIdArea
      const novoIdAreaExiste = await ctx.db.area.findUnique({
        where: {idarea: input.novoIdArea}
      })

      if (!novoIdAreaExiste) {
        throw new Error(`Área com ID ${input.novoIdArea} não existe!!!`);
      }

      // Apenas depois da verificação, deleto o vínculo da especialidade com a área para linkar com outra
      await ctx.db.tem1.delete({
        where: {
          idarea_idespecialidade: {
            idarea: input.antigoIdArea,
            idespecialidade: input.idEspecialidade
          },
        },
      });

      await ctx.db.tem1.create({
        data: {
          idarea: input.novoIdArea,
          idespecialidade: input.idEspecialidade,
        },
      });
    }),
});