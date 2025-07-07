'use client'

import { api } from "~/trpc/react";
import { useState } from "react";
import DeleteEspecialidade from "./deleteEspecialidade";
import AddNewEspecialidade from "./addEspecialidade";
import EditEspecialidade from "./editEspecialidade";

export default function EspecialidadePesquisa() {
  const { data: areas, isLoading, refetch} = api.area.listarAreasView.useQuery();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [especialidadeSelecionada, setEspecialidadeSelecionada] = useState<any>(null);

  

  const handleDelete = () => {
    setShowRemoveModal(false);
    refetch();
  };

  const handleCreate = () => {
    setShowCreateModal(false);
    refetch();
  };

  const handleUpdate = () => {
    setShowEditModal(false);
    refetch();
  };


  return (
    <div className="max-h-[500px] overflow-y-auto">
      <h1 className="text-cyan-600 font-bold text-4xl">Especialidades de pesquisas do departamento</h1>
      <table className="w-full border-4 border-solid border-black">
        <thead className="mx-auto w-5 table-auto border-collapse bg-gray-200 shadow-md">
          <tr className="w-max bg-blue-500 px-8">
            <th className="px-4 py-4 text-left text-white" colSpan={2}>
              Especialidades de pesquisas do departamento
            </th>
            <th colSpan={3}>
              <button 
                onClick={() => setShowCreateModal(true)}
                className="cursor-pointer rounded-md bg-green-600 px-5 py-2 text-white hover:bg-green-700"
              >
                Adicionar nova especialidade
              </button>
            </th>
          </tr>
          <tr>
            <th className="px-4 py-2">Id Area</th>
            <th className="px-4 py-2">Área</th>
            <th className="px-4 py-2">Especialização</th>
            <th className="px-4 py-2" colSpan={2}>
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          {areas?.map((e) => (
            <tr key={`${e.idarea}-${e.idespecialidade}`} className="text-center">
              <td className="px-4 py-2">{e.idarea}</td>
              <td className="px-4 py-2">{e.nomearea}</td>
              <td className="px-4 py-2">{e.nomeespecialidade}</td>
              <td className="px-4 py-2">
                <button 
                  onClick={() => {
                    setShowEditModal(true);
                    setEspecialidadeSelecionada(e);
                  }}
                >
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
                    setEspecialidadeSelecionada(e);
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

      {showRemoveModal && especialidadeSelecionada && (
        <DeleteEspecialidade
          nomeEspecialidade={especialidadeSelecionada.nomeespecialidade}
          idEspecialidade={especialidadeSelecionada.idespecialidade}
          onClose={() => setShowRemoveModal(false)}
          onConfirm={handleDelete}
        />
      )}

      {showCreateModal && (
        <AddNewEspecialidade 
          onClose={() => setShowCreateModal(false)}
          onConfirm={handleCreate}
        />
      )}

      {showEditModal && especialidadeSelecionada && (
        <EditEspecialidade 
          onClose={() => setShowEditModal(false)}
          onConfirm={handleUpdate}
          especialidade={especialidadeSelecionada}
        />
      )}
    </div>
  );
}