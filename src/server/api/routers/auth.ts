// src/server/api/routers/auth.ts
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import jwt from "jsonwebtoken";
import { parse } from "cookie";
import { NextApiRequest } from "next";

const SECRET = "chave-super-secreta"; // 🔐 coloque em variável de ambiente depois

export function gerarToken(payload: object) {
  return jwt.sign(payload, SECRET, { expiresIn: "1h" });
}

export function verificarToken(token: string) {
  return jwt.verify(token, SECRET);
}

export function extrairToken(req: NextApiRequest) {
  const cookies = parse(req.headers.cookie || "");
  return cookies.token;
}

export const authRouter = createTRPCRouter({
  login: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        senha: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.usuario.findFirst({
        where: {
          email: input.email,
          senha: input.senha, // ⚠️ depois a gente troca isso por hash
        },
      });

      if (!user) {
        throw new Error("Email ou senha inválidos.");
      }

      const matricula = user.matricula;

      const isAluno = await ctx.db.aluno.findFirst({
        where: { idusuario: matricula },
      });
      const isCoord = await ctx.db.coordenador.findFirst({
        where: { idusuario: matricula },
      });
      const isProf = await ctx.db.professor.findFirst({
        where: { idusuario: matricula },
      });

      let tipo: "aluno" | "coordenador" | "professor" | "usuario" = "usuario";
      if (isAluno) tipo = "aluno";
      else if (isCoord) tipo = "coordenador";
      else if (isProf) tipo = "professor";

      return {
        tipo,
        nome: user.nome,
        matricula: user.matricula,
        email: user.email,
      };
    }),
});
