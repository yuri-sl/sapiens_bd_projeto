import React, { useState } from "react";
import { api } from "~/trpc/react";
import AddNewProjeto from "~/app/_components/Coordenador/addProjeto";

export default function TabelaDepartamento() {
  const { data: pesquisas, isLoading, refetch } = api.pesquisa.listarView.useQuery();
  const [showModal, setShowModal] = useState(false);

  if (isLoading) return <p>Carregando...</p>;

  return (
    <div className="tabela-container">
      <div className="overflow-y-auto max-h-[500px]">
        <h1 className="text-cyan-600 font-bold text-4xl">Projetos do departamento</h1>
        <table className="border-4 border-solid border-black w-full">
          <thead className="bg-gray-200 shadow-md">
            <tr className="bg-blue-500 text-white">
              <th className="px-4 py-4 text-left" colSpan={6}>
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
              <th className="px-4 py-2">Título</th>
              <th className="px-4 py-2">Área</th>
              <th className="px-4 py-2">Especialidade</th>
              <th className="px-4 py-2">Professor Responsável</th>
              <th className="px-4 py-2">PDF</th>
              <th className="px-4 py-2">Editar</th>
              <th className="px-4 py-2">Deletar</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {pesquisas?.map((p) => (
              <tr key={p.idpesquisa}>
                <td className="px-4 py-2">{p.titulopesquisa}</td>
                <td className="px-4 py-2">{p.nomearea}</td>
                <td className="px-4 py-2">{p.nomeespecialidade}</td>
                <td className="px-4 py-2">{p.nomeprofessor}</td>
                <td className="px-4 py-2">
                  {p.relatorio ? (
                    <a
                      href={`data:application/pdf;base64,${p.relatorio}`}
                      download={`relatorio_${p.idpesquisa}.pdf`}
                      className="bg-amber-400 px-3 py-1 rounded"
                    >
                      Baixar
                    </a>
                  ) : (
                    "Nenhum"
                  )}
                </td>
                <td className="px-4 py-2">
                  <button onClick={() => alert("Editar ainda não implementado")}>
                    <img
                      src="/assets/edit.png"
                      alt="Editar"
                      className="h-10 w-10 cursor-pointer hover:opacity-70"
                    />
                  </button>
                </td>
                <td className="px-4 py-2">
                  <button onClick={() => alert("Deletar ainda não implementado")}>
                    <img
                      src="/assets/Trash 2.png"
                      alt="Deletar"
                      className="h-10 w-10 cursor-pointer hover:opacity-70"
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <AddNewProjeto
          onClose={() => {
            setShowModal(false);
            refetch();
          }}
        />
      )}
    </div>
  );
}
