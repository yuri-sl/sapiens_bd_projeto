import { NextApiRequest, NextApiResponse } from "next";
import { db } from "~/server/db";
import { gerarToken } from "~/utils/auth";
import { useRouter } from "next/router";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") return res.status(405).end();

  const { email, senha } = req.body;

  const user = await db.usuario.findFirst({
    where: { email, senha }, // usar hash depois
  });

  if (!user) return res.status(401).json({ erro: "Credenciais inválidas" });

  const tipo = (await db.aluno.findFirst({
    where: { idusuario: user.matricula },
  }))
    ? "aluno"
    : (await db.coordenador.findFirst({
          where: { idusuario: user.matricula },
        }))
      ? "coordenador"
      : (await db.professor.findFirst({
            where: { idusuario: user.matricula },
          }))
        ? "professor"
        : "usuario";

  const token = gerarToken({
    matricula: user.matricula,
    nome: user.nome,
    tipo,
  });

  res.setHeader("Set-Cookie", `token=${token}; HttpOnly; Path=/; Max-Age=3600`);
  return res.status(200).json({ tipo });
}
