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
        fotousuario: z.instanceof(Buffer).optional(),
      }),
    )
    .mutation(async ({ input }) => {
      return db.usuario.create({ data: input });
    }),
});
