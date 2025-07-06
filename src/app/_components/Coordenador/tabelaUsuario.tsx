import { api } from "~/trpc/react";
import { useState } from "react";

export default function UsuarioPage() {
  const { data: usuarios, isLoading } = api.usuario.getAll.useQuery();
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
      <h1 className="text-cyan-600 font-bold text-xl">Usuários do departamento</h1>
      <table className="w-full border-4 border-solid border-black">
        <thead className="mx-auto w-5 table-auto border-collapse bg-gray-200 shadow-md">
          <tr className="w-max bg-blue-500 px-8">
            <th className="px-4 py-4 text-left text-white" colSpan={9}>
              Usuários cadastrados no departamento
            </th>
          </tr>
          <tr>
            <th className="px-4 py-2">Matrícula</th>
            <th className="px-4 py-2">Foto de Perfil</th>
            <th className="px-4 py-2">Nome</th>
            <th className="px-4 py-2">CPF</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Senha</th>
            <th className="px-4 py-2" colSpan={2}>
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          {usuarios?.map((u) => (
            <tr className="text-center" key={u.matricula}>
              <td className="px-4 py-2">{u.matricula}</td>
              <td className="px-4 py-2">
                {u.fotousuario ? (
                  <img
                    src={`data:image/png;base64,${Buffer.from(u.fotousuario).toString("base64")}`}
                    alt="Foto de perfil"
                    className="h-14 w-14 rounded-full object-cover border"
                  />
                ) : (
                  <span className="text-gray-400 italic">Sem foto</span>
                )}
              </td>
              <td className="px-4 py-2">{u.nome}</td>
              <td className="px-4 py-2">{u.cpf}</td>
              <td className="px-4 py-2">{u.email}</td>
              <td className="px-4 py-2">{u.senha}</td>
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
