import { createTRPCRouter } from "../trpc";
import { publicProcedure } from "../trpc";

export const departamentoRouter = createTRPCRouter({
  listar: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.departamento.findMany();
    }),
});
