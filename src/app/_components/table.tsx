import React from "react";
import { api } from "~/trpc/react";

export default function Tabela() {
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
          {data?.map((d) => (
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
              <td className="px-4 py-2">Editar</td>
              <td className="px-4 py-2">Deletar</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h1>Departamentos</h1>
        <ul>{data?.map((d) => <li key={d.ID_Dep}>{d.Nome}</li>)}</ul>
      </div>
    </div>
  );
}
