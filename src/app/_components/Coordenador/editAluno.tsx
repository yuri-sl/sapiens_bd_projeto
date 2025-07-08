import React, { useState } from "react";
import { api } from "~/trpc/react";
import { useEffect } from "react";

interface EditAlunoProps {
  onClose: () => void;
    aluno: {
      matricula: number;
      nome: string;
      cpf: string;
      email: string;
      senha: string;
      curso: string;
      ira: number;
      data_ingresso: string;
      idpesquisa?: number | null;
      idbolsa?: number | null;
    };
  }

export default function EditAluno({ onClose, aluno }: EditAlunoProps) {{
  const atualizarAluno = api.usuario.atualizarAlunoProcedure.useMutation();

  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [matricula, setMatricula] = useState("");
  const [curso, setCurso] = useState("");
  const [ira, setIra] = useState("0");
  const [dataIngresso, setDataIngresso] = useState("");
  const [idPesquisa,setIdPesquisa] = useState("");
  const [idBolsa,setIdBolsa] = useState("");
  const [foto, setFoto] = useState<ArrayBuffer | null>(null);


  const handleSubmit = () => {
    atualizarAluno.mutate(
      {
        matricula: parseInt(matricula),
        nome,
        cpf,
        email,
        senha,
        curso,
        ira: parseFloat(ira),
        data_ingresso: dataIngresso,
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
    if (aluno) {
      setNome(aluno.nome);
      setCpf(aluno.cpf);
      setEmail(aluno.email);
      setSenha(aluno.senha);
      setMatricula(aluno.matricula.toString());
      setCurso(aluno.curso);
      setIra(aluno.ira.toString());
    }
  }, [aluno]);
  


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 bg-opacity-90">
      <div className="bg-white w-full max-w-4xl rounded-lg p-6 border-4 border-cyan-700 shadow-lg">
        <h1 className="font-bold text-blue-900 text-xl mb-4">Editar aluno</h1>

        <div className="flex justify-between gap-6">
          <div className="flex flex-col gap-2 w-1/2">
            <label>Nome do aluno</label>
            <input value={nome} onChange={(e) => setNome(e.target.value)} className="bg-gray-100 p-2 rounded" />

            <label>CPF</label>
            <input value={cpf} onChange={(e) => setCpf(e.target.value)} className="bg-gray-100 p-2 rounded" />

            <label>Matrícula</label>
            <input value={matricula} onChange={(e) => setMatricula(e.target.value)} className="bg-gray-100 p-2 rounded" />

            <label>Curso</label>
            <input value={curso} onChange={(e) => setCurso(e.target.value)} className="bg-gray-100 p-2 rounded" />

            <label>IRA</label>
            <input type="number" value={ira} onChange={(e) => setIra(e.target.value)} className="bg-gray-100 p-2 rounded" />

          </div>

          <div className="flex flex-col gap-2 w-1/2">
            <label>Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} className="bg-gray-100 p-2 rounded" />

            <label>Senha</label>
            <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} className="bg-gray-100 p-2 rounded" />

            <label>Pesquisa</label>
            <input  value={idPesquisa} onChange={(e) => setSenha(e.target.value)} className="bg-gray-100 p-2 rounded" />

            <label>Bolsa</label>
            <input value={idBolsa} onChange={(e) => setSenha(e.target.value)} className="bg-gray-100 p-2 rounded" />


            <label>Foto (opcional)</label>
            <input type="file" accept="image/*" onChange={handleFileChange} />          </div>
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={handleSubmit}
            className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded font-bold"
          >
            Salvar Alterações
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
}
}