import React from "react";
import Navbar from "~/app/_components/navbar";
import InformationsComponentCoord from "~/app/_components/Coordenador/informationsComponent";
import { PhotoComponent } from "~/app/_components/photoComponent";

export default function configCoord() {
  return (
    <div>
      <Navbar></Navbar>
      <h1>Editar as minhas configurações</h1>
      <div className="flex gap-6 items-start flex-wrap">
        <PhotoComponent></PhotoComponent>
        <InformationsComponentCoord/>

      </div>
      <button className="bg-red-600 rounded-lg w-96 h-10">Sair do Sistema</button>
    </div>
  );
}
