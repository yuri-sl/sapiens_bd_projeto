"use client";
import Link from "next/link";

import { LatestPost } from "~/app/_components/post";
import { api, HydrateClient } from "~/trpc/server";
import TabelaDepartamento from "~/app/_components/Coordenador/tabelaDepartamento";
import Navbar from "../_components/navbar";
import LoginBox from "../_components/loginBox";
import InformationsComponentCoord from "../_components/Coordenador/informationsComponent";
import UsuarioPage from "../_components/Coordenador/tabelaUsuario";
import AlunoTabela from "../_components/Coordenador/tabelaAluno";
import AreaPesquisa from "../_components/Coordenador/especialidadePesquisa";
import ProfessorTabela from "../_components/Coordenador/tabelaProfessor";

export default function Home() {
  return (
    <div>
      <Navbar />
      <h1>Hello Sapiens</h1>
      <UsuarioPage />
      <AlunoTabela />
      <ProfessorTabela/>
      <TabelaDepartamento />
      <AreaPesquisa/>
      <LoginBox></LoginBox>
      <InformationsComponentCoord />
    </div>
  );
}
