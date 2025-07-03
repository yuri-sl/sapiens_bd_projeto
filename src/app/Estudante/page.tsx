"use client";
import Link from "next/link";

import { LatestPost } from "~/app/_components/post";
import { api, HydrateClient } from "~/trpc/server";
import TabelaDepartamento from "~/app/_components/Coordenador/tabelaDepartamento";
import Navbar from "../_components/navbar";
import LoginBox from "../_components/loginBox";
import InformationsComponent from "../_components/Coordenador/informationsComponent";
import TabelaUsuario from "../_components/Coordenador/tabelaUsuario";

export default function Home() {
  return (
    <div>
      <Navbar />
      <h1> PÁGINA PRINCIPAL DO ESTUDANTE</h1>
    </div>
  );
}
