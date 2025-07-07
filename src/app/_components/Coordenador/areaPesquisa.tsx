'use client'

import { api } from "~/trpc/react";
import { useState } from "react";
import DeleteArea from "./deleteArea";
import AddNewArea from "./addArea";

export default function AreaPesquisa() {
  const { data: areas, isLoading, refetch} = api.area.listarAreas.useQuery();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [areaSelecionada, setAreaSelecionada] = useState<any>(null);
  
  const handleDelete = () => {
    setShowRemoveModal(false);
    refetch();
  };

  const handleCreate = () => {
    setShowCreateModal(false);
    refetch();
  };


  return (
    <div className="max-h-[500px] overflow-y-auto">
      <h1 className="text-cyan-600 font-bold text-4xl">Áreas de pesquisas do departamento</h1>
      <table className="w-full border-4 border-solid border-black">
        <thead className="mx-auto w-5 table-auto border-collapse bg-gray-200 shadow-md">
          <tr className="w-max bg-blue-500 px-8">
            <th className="px-4 py-4 text-left text-white" colSpan={2}>
              Áreas de pesquisas do departamento
            </th>
            <th colSpan={3}>
              <button
                onClick={() => setShowCreateModal(true)}
                className="cursor-pointer rounded-md bg-green-600 px-5 py-2 text-white hover:bg-green-700"
              >
                Adicionar nova área
              </button>
            </th>
          </tr>
          <tr>
            <th className="px-4 py-2">Id Area</th>
            <th className="px-4 py-2">Área</th>

            <th className="px-4 py-2" colSpan={3}>
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          {areas?.map((a) => (
            <tr key={a.idarea} className="text-center">
              <td className="px-4 py-2">{a.idarea}</td>
              <td className="px-4 py-2">{a.nomearea}</td>
              <td className="px-4 py-2">
                <button onClick={() => editar(u.matricula)}>
                  <img
                    src="/assets/edit.png"
                    alt="Editar"
                    className="h-10 w-10 cursor-pointer transition hover:opacity-70"
                  />
                </button>
              </td>
              <td className="px-4 py-2">
                <button 
                  onClick={() => {
                    setAreaSelecionada(a);
                    setShowRemoveModal(true);
                  }} 
                  title="Deletar"
                >
                  <img
                    src="/assets/Trash 2.png"
                    alt="Ícone de deletar"
                    className="h-10 w-10 cursor-pointer transition hover:opacity-70"
                  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showRemoveModal && areaSelecionada && (
        <DeleteArea
          nomeArea={areaSelecionada.nomearea}
          idArea={areaSelecionada.idarea}
          onClose={() => setShowRemoveModal(false)}
          onConfirm={handleDelete}
        />
      )}


      {showCreateModal && (
        <AddNewArea
          onClose={() => setShowCreateModal(false)}
          onConfirm={handleCreate}
        />
      )}
    </div>
  );
}
