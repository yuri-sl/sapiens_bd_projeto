import React, { useState } from "react";
import { api } from "~/trpc/react";

export default function AddNewProfessor({ onClose }: { onClose: () => void }) {
  const cadastrarProfessor = api.usuario.cadastrarProfessorProcedure.useMutation();

  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [matricula, setMatricula] = useState("");
  const [titulo, setTitulo] = useState("");
  const [cargaHoraria, setCargaHoraria] = useState("");

  const handleSubmit = () => {
    cadastrarProfessor.mutate({
      nome,
      cpf,
      email,
      senha,
      matricula: parseInt(matricula),
      titulo,
      cargaHoraria: parseInt(cargaHoraria),
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 bg-opacity-90">
      <div className="bg-white w-full max-w-4xl rounded-lg p-6 border-4 border-cyan-700 shadow-lg">
        <h1 className="font-bold text-blue-900 text-xl mb-4">Adicionar novo professor</h1>

        <div className="flex justify-between gap-6">
          <div className="flex flex-col gap-2 w-1/2">
            <label>Matrícula</label>
            <input value={matricula} onChange={(e) => setMatricula(e.target.value)} className="bg-gray-100 p-2 rounded" />

            <label>Nome do Professor</label>
            <input value={nome} onChange={(e) => setNome(e.target.value)} className="bg-gray-100 p-2 rounded" />

            <label>CPF</label>
            <input value={cpf} onChange={(e) => setCpf(e.target.value)} className="bg-gray-100 p-2 rounded" />

            <label>Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} className="bg-gray-100 p-2 rounded" />

            <label>Senha</label>
            <input value={senha} onChange={(e) => setSenha(e.target.value)} className="bg-gray-100 p-2 rounded" />
          </div>

          <div className="flex flex-col gap-2 w-1/2">
            <label>Título</label>
            <input value={titulo} onChange={(e) => setTitulo(e.target.value)} className="bg-gray-100 p-2 rounded" />

            <label>Carga Horária</label>
            <input value={cargaHoraria} onChange={(e) => setCargaHoraria(e.target.value)} className="bg-gray-100 p-2 rounded" />

            <label>Foto (opcional)</label>
            <button className="bg-gray-500 rounded-lg p-2 w-fit">Selecionar imagem</button>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={handleSubmit}
            className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded font-bold"
          >
            Criar novo Professor
          </button>
          <button
            onClick={onClose}
            className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded font-bold"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
