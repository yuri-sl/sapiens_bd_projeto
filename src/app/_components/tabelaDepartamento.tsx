import React from "react";
import { api } from "~/trpc/react";

export default function TabelaDepartamento() {
  const { data, isLoading } = api.departamento.listar.useQuery();

  if (isLoading) return <p>Carregando...</p>;
  return (
    <div className="tabela-container">
      <h2>Tabela componente</h2>
      <table className="border-4 border-solid border-black">
        <thead className="mx-auto w-5 table-auto border-collapse bg-gray-200 shadow-md">
          <tr className="py- bg-blue-500 px-5">
            <th className="px-4 py-4 text-left text-white" colSpan={6}>
              [Nome do departamento]
            </th>
            <th colSpan={2}>
              <button className="cursor-pointer rounded-md bg-green-600 px-5 py-2 text-white hover:bg-green-700">
                Adicionar Novo Projeto
              </button>
            </th>
          </tr>
          <tr>
            <th className="px-4 py-2"> CheckBox </th>
            <th className="px-4 py-2">Título Pesquisa</th>
            <th className="px-4 py-2">Área</th>
            <th className="px-4 py-2">Especialidade</th>
            <th className="px-4 py-2">Professor Responsável</th>
            <th className="px-4 py-2">Departamentos associados</th>
            <th className="px-4 py-2" colSpan={2}>
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((d: { ID_dep: number; Nome: String }) => (
            <tr key={d.ID_dep}>
              <td className="px-4 py-2">
                <input
                  type="Checkbox"
                  className="h-6 w-8 accent-blue-600"
                ></input>
              </td>
              <td className="px-4 py-2">Lagostas Forenses {d.Nome}</td>
              <td className="px-4 py-2">Lagostagem</td>
              <td className="px-4 py-2">Pesquisas de lagostas</td>
              <td className="px-4 py-2">marcelo lagosta</td>
              <td className="px-4 py-2">Ciencias da Lagostas</td>
              <td className="px-4 py-2">
                <button onClick={() => deletar(d.ID_dep)}>
                  <img
                    src="/assets/edit.png"
                    alt="Editar"
                    className="h-10 w-10 cursor-pointer transition hover:opacity-70"
                  ></img>
                </button>
              </td>
              <td className="px-4 py-2">
                <button onClick={() => deletar(d.id)} title="Deletar">
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
      <div>
        <h1>Departamentos</h1>
      </div>
    </div>
  );
}
