"use client";
import Link from "next/link";

import { LatestPost } from "~/app/_components/post";
import { api, HydrateClient } from "~/trpc/server";
import TabelaDepartamento from "~/app/_components/tabelaDepartamento";
import Navbar from "./_components/navbar";
import LoginBox from "./_components/loginBox";

export default async function Home() {
  return (
    <div>
      <Navbar />
      <h1>Hello Sapiens</h1>
      <TabelaDepartamento></TabelaDepartamento>
      <LoginBox></LoginBox>
    </div>
  );
}
