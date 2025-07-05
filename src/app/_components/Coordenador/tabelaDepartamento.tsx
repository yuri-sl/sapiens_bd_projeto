import React, { useState } from "react";
import { api } from "~/trpc/react";
import AddNewProjeto from "~/app/_components/Coordenador/addProjeto"; // ajuste o caminho se estiver diferente

export default function TabelaDepartamento() {
  const { data, isLoading } = api.departamento.listar.useQuery();
  const [showModal, setShowModal] = useState(false);
//IMPORTANTE => ELA VAI QUERER TESTAR COMO QUE O SISTEMA COMPORTA EM DELETAR DADOS QUE TEM FK E PK RELACIONADOS/
//
  if (isLoading) return <p>Carregando...</p>;

  return (
<div className="tabela-container">
  <h2>Tabela componente</h2>

  {/* Container da tabela com rolagem vertical */}
  <div className="overflow-y-auto max-h-[500px]">
  <h1 className="text-cyan-600 font-bold text-4xl">Projetos do departaento</h1>
    <table className="border-4 border-solid border-black w-full">
      <thead className="mx-auto w-5 table-auto border-collapse bg-gray-200 shadow-md">
        <tr className="bg-blue-500">
          <th className="px-4 py-4 text-left text-white" colSpan={6}>
            Projetos cadastrados no departamento
          </th>
          <th colSpan={3}>
            <button
              onClick={() => setShowModal(true)}
              className="cursor-pointer rounded-md bg-green-600 px-5 py-2 text-white hover:bg-green-700"
            >
              Adicionar Novo Projeto
            </button>
          </th>
        </tr>
        <tr>
          <th className="px-4 py-2">CheckBox</th>
          <th className="px-4 py-2">Título Pesquisa</th>
          <th className="px-4 py-2">Área</th>
          <th className="px-4 py-2">Especialidade</th>
          <th className="px-4 py-2">Professor Responsável</th>
          <th className="px-4 py-2">Departamentos associados</th>
          <th className="px-4 py-2">Arquivo PDF</th>
          <th className="px-4 py-2" colSpan={2}>Ações</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((d: { ID_Dep: number; Nome: string }) => (
          <tr key={d.ID_Dep}>
            <td className="px-4 py-2">
              <input type="checkbox" className="h-6 w-8 accent-blue-600" />
            </td>
            <td className="px-4 py-2">Lagostas Forenses {d.Nome}</td>
            <td className="px-4 py-2">Lagostagem</td>
            <td className="px-4 py-2">Pesquisas de lagostas</td>
            <td className="px-4 py-2">marcelo lagosta</td>
            <td className="px-4 py-2">Ciencias da Lagostas</td>
            <td>
              <button className="bg-amber-400 border-1 rounded-md">
                Baixar o arquivo PDF
              </button>
            </td>
            <td className="px-4 py-2">
              <button onClick={() => deletar(d.ID_Dep)}>
                <img
                  src="/assets/edit.png"
                  alt="Editar"
                  className="h-10 w-10 cursor-pointer transition hover:opacity-70"
                />
              </button>
            </td>
            <td className="px-4 py-2">
              <button onClick={() => deletar(d.ID_Dep)} title="Deletar">
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
  </div>

  {showModal && <AddNewProjeto onClose={() => setShowModal(false)} />}
</div>
  );
}
