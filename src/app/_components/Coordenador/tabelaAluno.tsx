import { api } from "~/trpc/react";
import { useState } from "react";
import AddNewAluno from "./addAluno";
import EditAluno from "./editAluno";
import RemoveAluno from "./deleteAluno";

export default function UsuarioPage() {
  const { data: alunos, isLoading, refetch } = api.usuario.listarAlunosView.useQuery();
  const deletarAluno = api.usuario.deletarAluno.useMutation();
  const [showModal, setShowModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [alunoSelecionado, setAlunoSelecionado] = useState<any>(null);
  const [deletandoId, setDeletandoId] = useState<number | null>(null);
  const handleDeletar = (matricula: number) => {
    if (deletandoId === matricula) return; // já em andamento
  
    setDeletandoId(matricula);
  
    deletarAluno.mutate(
      { matricula },
      {
        onSuccess: () => {
          setDeletandoId(null);
          // talvez: refetch(), toast, etc.
        },
        onError: () => {
          setDeletandoId(null);
        },
      }
    );
  };
  

  const handleDelete = () => {
    setShowRemoveModal(false);
    refetch();
  };
  

  return (
    <div className="max-h-[500px] overflow-y-auto">
      <h1 className="text-cyan-600 font-bold text-4xl">Alunos do departamento</h1>

      <table className="w-full border-4 border-solid border-black">
        <thead className="bg-blue-500 text-white">
          <tr>
            <th className="px-4 py-4 text-left" colSpan={10}>
              Alunos cadastrados no departamento
            </th>
            <th colSpan={2}>
              <button
                className="cursor-pointer rounded-md bg-green-600 px-5 py-2 text-white hover:bg-green-700"
                onClick={() => setShowModal(true)}
              >
                Adicionar novo aluno
              </button>
            </th>
          </tr>
          <tr className="bg-gray-200 text-black">
            <th className="px-4 py-2">Matrícula</th>
            <th className="px-4 py-2">Nome</th>
            <th className="px-4 py-2">CPF</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Senha</th>
            <th className="px-4 py-2">Curso</th>
            <th className="px-4 py-2">IRA</th>
            <th className="px-4 py-2">DataIngresso</th>
            <th className="px-4 py-2">Pesquisa</th>
            <th className="px-4 py-2">Bolsa</th>
            <th className="px-4 py-2" colSpan={2}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {alunos?.map((u) => (
            <tr className="text-center" key={u.matricula}>
              <td className="px-4 py-2">{u.matricula}</td>
              <td className="px-4 py-2">{u.nome}</td>
              <td className="px-4 py-2">{u.cpf}</td>
              <td className="px-4 py-2">{u.email}</td>
              <td className="px-4 py-2">{u.senha}</td>
              <td className="px-4 py-2">{u.curso}</td>
              <td className="px-4 py-2">{u.ira}</td>
              <td className="px-4 py-2">
                {u.data_ingresso ? new Date(u.data_ingresso).toLocaleDateString() : "N/A"}
              </td>
              <td className="px-4 py-2">{u.idpesquisa ?? "Sem pesquisa"}</td>
              <td className="px-4 py-2">{u.idbolsa ?? "Sem bolsa"}</td>

              <td className="px-4 py-2">
                <button
                  onClick={() => {
                    setAlunoSelecionado(u);
                    setShowEditModal(true);
                  }}
                  title="Editar"
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
                    setAlunoSelecionado(u);
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

      {showModal && <AddNewAluno onClose={() => { setShowModal(false);}} />}

      {showRemoveModal && alunoSelecionado && (
        <RemoveAluno
          nomeAluno={alunoSelecionado.nome}
          matricula={alunoSelecionado.matricula}
          onClose={() => setShowRemoveModal(false)}
          onConfirm={handleDelete}
        />
      )}

      {showEditModal && alunoSelecionado && (
        <EditAluno
          aluno={alunoSelecionado}
          onClose={() => {
            setShowEditModal(false);
            refetch();
          }}
        />
      )}
    </div>
  );
}
