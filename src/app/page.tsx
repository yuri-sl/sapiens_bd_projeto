"use client";
import Link from "next/link";

import { LatestPost } from "~/app/_components/post";
import { api, HydrateClient } from "~/trpc/server";
import TabelaDepartamento from "~/app/_components/Coordenador/tabelaDepartamento";
import Navbar from "./_components/navbar";
import LoginBox from "./_components/loginBox";
import InformationsComponentCoord from "./_components/Coordenador/informationsComponent";

export default function Home() {
  return (
    <div>
      <Navbar />
      <h1> PÁGINA PRINCIPAL DO PROJETO SAPIENS</h1>
    </div>
  );
}
