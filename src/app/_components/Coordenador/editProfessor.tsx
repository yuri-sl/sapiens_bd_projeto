import React, { useEffect, useState } from "react";
import { api } from "~/trpc/react";

interface Professor {
  matricula: number;
  nome: string;
  cpf: string;
  email: string;
  senha: string;
  titulo: string;
  cargaHoraria?: number;
}

interface Props {
  onClose: () => void;
  professor: Professor;
}

export default function EditProfessor({ onClose, professor }: Props) {
  const atualizarProfessor = api.usuario.atualizarProfessorProcedure.useMutation();

  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [matricula, setMatricula] = useState("");
  const [titulo, setTitulo] = useState("");
  const [cargaHoraria, setCargaHoraria] = useState("");
  const [foto, setFoto] = useState<ArrayBuffer | null>(null);

  const handleSubmit = () => {
    const carga = parseInt(cargaHoraria);
    if (isNaN(carga)) {
      alert("Carga Horária inválida. Insira um número válido.");
      return;
    }
    atualizarProfessor.mutate(
      {
        matricula: parseInt(matricula),
        nome,
        cpf,
        email,
        senha,
        titulo,
        cargaHoraria: carga,
        fotousuario: foto ? Buffer.from(foto).toString("base64") : null,
      },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const arrayBuffer = await file.arrayBuffer();
      setFoto(arrayBuffer);
    }
  };

  useEffect(() => {
    if (!professor) return;
    setNome(professor.nome);
    setCpf(professor.cpf);
    setEmail(professor.email);
    setSenha(professor.senha);
    setMatricula(professor.matricula.toString());
    setTitulo(professor.titulo);
    setCargaHoraria(professor.cargaHoraria?.toString() || "");
  }, [professor]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 bg-opacity-90">
      <div className="bg-white w-full max-w-4xl rounded-lg p-6 border-4 border-cyan-700 shadow-lg">
        <h1 className="font-bold text-blue-900 text-xl mb-4">Alterar dados de professor</h1>

        <div className="flex justify-between gap-6">
          <div className="flex flex-col gap-2 w-1/2">
            <label>Matrícula</label>
            <input value={matricula} disabled className="bg-gray-300 p-2 rounded" />

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
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={handleSubmit}
            className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded font-bold"
          >
            Salvar alterações
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
