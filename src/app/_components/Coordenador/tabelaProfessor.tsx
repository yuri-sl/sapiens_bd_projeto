import { api } from "~/trpc/react";
import { useState } from "react";
import AddNewProfessor from "./addProfessor";
import RemoveProfessor from "./deleteProfessor";

export default function ProfessorTabela() {
  const createUsuario = api.usuario.create.useMutation();
  const { data: professores, isLoading } = api.usuario.listarProfessoresView.useQuery();

  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [matricula, setMatricula] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [professorSelecionado, setProfessorSelecionado] = useState<any>(null);

  const handleDelete = async () => {
    if (!professorSelecionado) return;
    await deletarProfessor.mutateAsync({ matricula: professorSelecionado.matricula });
    setShowRemoveModal(false);
    refetch();
  };



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
    setMatricula("");
  };

  return (
    <div className="max-h-[500px] overflow-y-auto">
      <h1 className="text-cyan-600 font-bold text-4xl">Professores do departamento</h1>
      <table className="w-full border-4 border-solid border-black">
        <thead className="bg-blue-500 text-white">
          <tr>
            <th className="px-4 py-4 text-left" colSpan={7}>
              Professores cadastrados no departamento
            </th>
            <th colSpan={2}>
              <button
              onClick={() => setShowModal(true)}
              className="cursor-pointer rounded-md bg-green-600 px-5 py-2 text-white hover:bg-green-700"
              >
                Adicionar novo professor
              </button>
            </th>
          </tr>
          <tr className="bg-gray-200 text-black">
            <th className="px-4 py-2">Check</th>
            <th className="px-4 py-2">Matrícula</th>
            <th className="px-4 py-2">Nome</th>
            <th className="px-4 py-2">CPF</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Senha</th>
            <th className="px-4 py-2">Título</th>
            <th className="px-4 py-2">Área de Atuação</th>
            <th className="px-4 py-2">Carga Horária</th>
            <th className="px-4 py-2" colSpan={2}>
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          {professores?.map((u) => (
            <tr key={u.matricula}>
              <td className="px-4 py-2">
                <input type="checkbox" className="h-6 w-8 accent-blue-600" />
              </td>
              <td className="px-4 py-2">{u.matricula}</td>
              <td className="px-4 py-2">{u.nome}</td>
              <td className="px-4 py-2">{u.cpf}</td>
              <td className="px-4 py-2">{u.email}</td>
              <td className="px-4 py-2">{u.senha}</td>
              <td className="px-4 py-2">{u.titulo}</td>
              <td className="px-4 py-2">{u.cargaHoraria}</td>
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
                    setProfessorSelecionado(u);
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
    {showModal && <AddNewProfessor onClose={() => setShowModal(false)} />}
    {showRemoveModal && professorSelecionado && (
  <RemoveProfessor
    nomeProfessor={professorSelecionado.nome}
    matricula={professorSelecionado.matricula}
    onClose={() => setShowRemoveModal(false)}
    onConfirm={handleDelete}
  />
)}
    </div>
  );
}
