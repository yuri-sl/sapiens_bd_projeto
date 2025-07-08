import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";


export const pesquisaRouter = createTRPCRouter({
    listarPesquisas: publicProcedure.query(async ({ ctx }) => {
      return await ctx.db.pesquisa.findMany({
        include: {
          professor: true,
          projeto: true,
        },
      });
    }),
    listarView: publicProcedure.query(async ({ ctx }) => {
        return await ctx.db.$queryRaw`SELECT * FROM vw_pesquisas ORDER BY idpesquisa ASC`;
      }),
      cadastrarProjeto: publicProcedure
      .input(z.object({
        titulopesquisa: z.string(),
        datainicio: z.string(),
        datafim: z.string(),
        estadopesquisa: z.string(),
        vagasvoluntarias: z.number(),
        vagasremuneradas: z.number(),
        idespecialidade: z.number(),
        idprofessor: z.number(),
        iddepartamento: z.number(),
        relatorio: z.instanceof(Buffer).optional()
      }))
      .mutation(async ({ input, ctx }) => {
        await ctx.db.$executeRaw`
          SELECT cadastrar_projeto(
            ${input.titulopesquisa}::VARCHAR,
            ${input.datainicio}::DATE,
            ${input.datafim}::DATE,
            ${input.estadopesquisa}::VARCHAR,
            ${input.vagasvoluntarias}::INT,
            ${input.vagasremuneradas}::INT,
            ${input.idespecialidade}::INT,
            ${input.idprofessor}::INT,
            ${input.iddepartamento}::INT,
            ${input.relatorio}::BYTEA
          );
        `;
      })
    
      
  });
  