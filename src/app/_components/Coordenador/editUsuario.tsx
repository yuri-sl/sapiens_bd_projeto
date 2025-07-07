import React, { useEffect, useState } from "react";
import { api } from "~/trpc/react";

interface Usuario {
    matricula: number;
    nome: string;
    cpf: string;
    email: string;
    senha: string;
  }
  
  interface Props {
    onClose: () => void;
    usuario: Usuario;
  }


export default function EditUsuario({ usuario, onClose }: { usuario: any; onClose: () => void }) {
  const atualizarUsuario = api.usuario.atualizarUsuarioProcedure.useMutation();

  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [matricula, setMatricula] = useState("");
  const [foto, setFoto] = useState<ArrayBuffer | null>(null);
  

  useEffect(() => {
    if (usuario) {
      setNome(usuario.nome || "");
      setCpf(usuario.cpf || "");
      setEmail(usuario.email || "");
      setSenha(usuario.senha || "");
      setMatricula(usuario.matricula?.toString() || "");
    }
  }, [usuario]);

  const handleSubmit = () => {
    atualizarUsuario.mutate({
      nome,
      cpf,
      email,
      senha,
      matricula: parseInt(matricula),
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
    if (!usuario) return;
    setNome(usuario.nome);
    setCpf(usuario.cpf);
    setEmail(usuario.email);
    setSenha(usuario.senha);
    setMatricula(usuario.matricula.toString());
  }, [usuario]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 bg-opacity-90">
      <div className="bg-white w-full max-w-4xl rounded-lg p-6 border-4 border-cyan-700 shadow-lg">
        <h1 className="font-bold text-blue-900 text-xl mb-4">Alterar dados do usuário</h1>

        <div className="flex justify-between gap-6">
          <div className="flex flex-col gap-2 w-1/2">
            <label>Matrícula</label>
            <input value={matricula} onChange={(e) => setMatricula(e.target.value)} className="bg-gray-100 p-2 rounded" />

            <label>Nome do usuário</label>
            <input value={nome} onChange={(e) => setNome(e.target.value)} className="bg-gray-100 p-2 rounded" />

            <label>CPF</label>
            <input value={cpf} onChange={(e) => setCpf(e.target.value)} className="bg-gray-100 p-2 rounded" />

          </div>

          <div className="flex flex-col gap-2 w-1/2">
            <label>Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} className="bg-gray-100 p-2 rounded" />

            <label>Senha</label>
            <input value={senha} onChange={(e) => setSenha(e.target.value)} className="bg-gray-100 p-2 rounded" />

            <label>Foto (opcional)</label>
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={handleSubmit}
            className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded font-bold"
          >
            Atualizar Usuário
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
