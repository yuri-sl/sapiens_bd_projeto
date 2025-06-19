"use client";
import Link from "next/link";

import { LatestPost } from "~/app/_components/post";
import { api, HydrateClient } from "~/trpc/server";
import Tabela from "~/app/_components/table";

export default async function Home() {
  return (
    <div>
      <h1>Hello Sapiens</h1>
      <Tabela></Tabela>
    </div>
  );
}
