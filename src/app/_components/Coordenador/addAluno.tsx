import React, { useState } from "react";
import { api } from "~/trpc/react";

export default function AddNewAluno({ onClose }: { onClose: () => void }) {
  const cadastrarAluno = api.usuario.cadastrarAlunoProcedure.useMutation();

  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [matricula, setMatricula] = useState("");
  const [curso, setCurso] = useState("");
  const [ira, setIra] = useState("0");
  const [dataIngresso, setDataIngresso] = useState("");
  const [foto, setFoto] = useState<string | null>(null);
    
  const handleSubmit = () => {
    cadastrarAluno.mutate({
      nome,
      cpf,
      email,
      senha,
      matricula: parseInt(matricula),
      curso,
      ira: parseFloat(ira),
      data_ingresso: dataIngresso,
      idpesquisa: null,
      idbolsa: null,
      fotousuario: foto,
    });

    onClose();
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
        <h1 className="font-bold text-blue-900 text-xl mb-4">Adicionar novo aluno</h1>

        <div className="flex justify-between gap-6">
          <div className="flex flex-col gap-2 w-1/2">
            <label>Nome do aluno</label>
            <input required value={nome} onChange={(e) => setNome(e.target.value)} className="bg-gray-100 p-2 rounded" />

            <label>CPF</label>
            <input required value={cpf} onChange={(e) => setCpf(e.target.value)} className="bg-gray-100 p-2 rounded" />

            <label>Matrícula</label>
            <input required value={matricula} onChange={(e) => setMatricula(e.target.value)} className="bg-gray-100 p-2 rounded" />

            <label>Curso</label>
            <input required value={curso} onChange={(e) => setCurso(e.target.value)} className="bg-gray-100 p-2 rounded" />

            <label>IRA</label>
            <input required type="number" value={ira} onChange={(e) => setIra(e.target.value)} className="bg-gray-100 p-2 rounded" min="0" max="5" step="1" />

            <label>Data de Ingresso</label>
            <input required type="date" value={dataIngresso} onChange={(e) => setDataIngresso(e.target.value)} className="bg-gray-100 p-2 rounded" />
          </div>

          <div className="flex flex-col gap-2 w-1/2">
            <label>Email</label>
            <input required value={email} onChange={(e) => setEmail(e.target.value)} className="bg-gray-100 p-2 rounded" />

            <label>Senha</label>
            <input  required type="password" value={senha} onChange={(e) => setSenha(e.target.value)} className="bg-gray-100 p-2 rounded" />

            <label>Foto (opcional)</label>
            <input type="file" accept="image/*" onChange={handleFileChange} />          </div>
            {foto && (
              <img
                src={`data:image/jpeg;base64,${btoa(
                  String.fromCharCode(...Array.from(foto))
                )}`}
                alt="Pré-visualização da foto"
                className="w-32 h-32 object-cover mt-2 rounded border"
              />
            )}
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={handleSubmit}
            className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded font-bold"
          >
            Criar novo aluno
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
