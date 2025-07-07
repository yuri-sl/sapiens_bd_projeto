import { api } from "~/trpc/react";
import { useState } from "react";

export default function AreaPesquisa() {
  const { data: areas, isLoading, refetch} = api.area.listarAreasView.useQuery();
  const createUsuario = api.usuario.create.useMutation();

  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [matricula, setmatricula] = useState("");

  const handleSubmit = () => {
    createUsuario.mutate({
      nome,
      cpf,
      email,
      senha,
      matricula: parseInt(matricula),
    });
    setNome("");
    setCpf("");
    setEmail("");
    setSenha("");
    setmatricula("");
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
              <button className="cursor-pointer rounded-md bg-green-600 px-5 py-2 text-white hover:bg-green-700">
                Adicionar nova área
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
          {areas?.map((a) => (
            <tr key={`${a.idarea}-${a.idespecialidade}`}>
              <td className="px-4 py-2">{a.idarea}</td>
              <td className="px-4 py-2">{a.nomearea}</td>
              <td className="px-4 py-2">{a.nomeespecialidade}</td>
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
  );
}
