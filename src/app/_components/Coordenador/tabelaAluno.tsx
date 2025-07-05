import { api } from "~/trpc/react";
import { useState } from "react";

export default function AlunoTabela() {
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
      <table className="w-full border-4 border-solid border-black">
        <thead className="mx-auto w-5 table-auto border-collapse bg-gray-200 shadow-md">
          <tr className="w-max bg-blue-500 px-8">
            <th className="px-4 py-4 text-left text-white" colSpan={2}>
              Alunos cadastrados no departamento
            </th>
            <th colSpan={3}>
              <button className="cursor-pointer rounded-md bg-green-600 px-5 py-2 text-white hover:bg-green-700">
                Adicionar novo usuário
              </button>
            </th>
          </tr>
          <tr>
            <th className="px-4 py-2">Item</th>
            <th className="px-4 py-2">Matrícula</th>
            <th className="px-4 py-2">Nome</th>
            <th className="px-4 py-2">CPF</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Senha</th>
            <th className="px-4 py-2">Curso</th>
            <th className="px-4 py-2">IRA</th>
            <th className="px-4 py-2">Data de ingresso</th>
            <th className="px-4 py-2" colSpan={2}>
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          {usuarios?.map((u) => (
            <tr key={u.matricula}>
              <td className="px-4 py-2">
                <input type="checkbox" className="h-6 w-8 accent-blue-600" />
              </td>
              <td className="px-4 py-2">999{u.matricula}</td>
              <td className="px-4 py-2">{u.nome}</td>
              <td className="px-4 py-2">{u.cpf}</td>
              <td className="px-4 py-2">{u.email}</td>
              <td className="px-4 py-2">{u.senha}</td>
              <td className="px-4 py-2">Engenharia de Lagosta</td>
              <td className="px-4 py-2">4.76</td>
              <td className="px-4 py-2">10/09/2022</td>
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
              <td className="px-4 py-2">{u.aluno?.curso ?? "N/A"}</td>
              <td className="px-4 py-2">{u.aluno?.ira ?? "N/A"}</td>
              <td className="px-4 py-2">
                {u.aluno?.data_ingresso
                  ? new Date(u.aluno.data_ingresso).toLocaleDateString("pt-BR")
                  : "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h1>Usuários</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {usuarios?.map((u) => (
            <li key={u.matricula}>
              {u.nome} - {u.email}
            </li>
          ))}
        </ul>
      )}

      <div style={{ marginTop: "20px" }}>
        <input
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          placeholder="CPF"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
        />
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <input
          placeholder="Matricula"
          value={matricula}
          onChange={(e) => setmatricula(e.target.value)}
        />
        <button onClick={handleSubmit}>Criar Usuário</button>
      </div>
    </div>
  );
}
