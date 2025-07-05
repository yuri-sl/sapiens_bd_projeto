import React from "react";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createTRPCRouter } from "~/server/api/trpc";

export default function LoginBox() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const loginMutation = api.auth.login.useMutation();

  const handleLogin = async () => {
    try {
      const res = await loginMutation.mutateAsync({ email, senha });

      if (res.tipo === "aluno") router.push("/Estudante");
      else if (res.tipo === "coordenador") router.push("/Coordenador");
      else if (res.tipo === "professor") router.push("/Professor");
      else alert("Usuário sem tipo deifnido");
    } catch (err) {
      alert("Login inválido");
    }
  };

  return (
    <div className="3x1 m-4 flex h-full w-80 flex-col rounded-lg border-10 border-cyan-900 bg-gray-200">
      <h1 className="text-black-6x1 m-4 text-center font-bold">Fazer Login</h1>
      <h3 className="text-black-6x1 m-4 font-bold">Email:</h3>
      <input
        className="m-4 bg-gray-100"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      ></input>
      <h3 className="text-black-6x1 m-4 font-bold">Senha:</h3>
      <input
        type="password"
        className="m-4 bg-gray-100"
        placeholder="password"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      ></input>
      <button
        className="m-4 mb-56 cursor-pointer rounded-md border-blue-700 bg-cyan-700 font-bold text-white hover:bg-cyan-900"
        onClick={handleLogin}
      >
        Login
      </button>
    </div>
  );
}
