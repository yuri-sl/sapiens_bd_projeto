import React, { useState } from "react";
import { api } from "~/trpc/react";

export default function AddNewProfessor({ onClose }: { onClose: () => void }) {
  const cadastrarProfessor = api.usuario.cadastrarProfessorProcedure.useMutation({
    onSuccess: () => {
      onClose();
    },
  });

  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [matricula, setMatricula] = useState("");
  const [titulo, setTitulo] = useState("");
  const [cargaHoraria, setCargaHoraria] = useState("");
  const [foto, setFoto] = useState<string | null>(null);
  const [idArea, setIdArea] = useState(0);
  

  const handleSubmit = () => {
    cadastrarProfessor.mutate({
      nome,
      cpf,
      email,
      senha,
      matricula: parseInt(matricula),
      titulo,
      cargaHoraria: parseInt(cargaHoraria),
      fotousuario: foto,
      idArea,
    });
  };
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;
        if (typeof result === "string") {
          // Remove prefixo 'data:image/png;base64,...' se presente
          const base64 = result.split(",")[1];
          setFoto(base64); // agora é uma string base64
        }
      };
      reader.readAsDataURL(file); // lê como base64
    }
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
            <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} className="bg-gray-100 p-2 rounded" />
          </div>

          <div className="flex flex-col gap-2 w-1/2">
            <label>Título</label>
            <input value={titulo} onChange={(e) => setTitulo(e.target.value)} className="bg-gray-100 p-2 rounded" />

            <label>Carga Horária</label>
            <input value={cargaHoraria} onChange={(e) => setCargaHoraria(e.target.value)} className="bg-gray-100 p-2 rounded" />

            <label>ID de Área de Atuação</label>
            <input value={idArea} onChange={(e) => setIdArea(Number(e.target.value))} className="bg-gray-100 p-2 rounded" />

            <label>Foto (opcional)</label>
            <input type="file" accept="image/*" onChange={handleFileChange} />

            {foto && (
              <img
                src={`data:image/jpeg;base64,${foto}`}
                alt="Pré-visualização da foto"
                className="w-32 h-32 object-cover mt-2 rounded border"
              />
            )}
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
