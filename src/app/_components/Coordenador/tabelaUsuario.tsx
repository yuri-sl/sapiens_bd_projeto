import { api } from "~/trpc/react";
import { useState } from "react";

export default function UsuarioPage() {
  const { data: usuarios, isLoading } = api.usuario.getAll.useQuery();
  const createUsuario = api.usuario.create.useMutation();

  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = () => {
    createUsuario.mutate({ nome, cpf, email, senha });
    setNome("");
    setCpf("");
    setEmail("");
    setSenha("");
  };

  return (
    <div>
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
        <button onClick={handleSubmit}>Criar Usuário</button>
      </div>
    </div>
  );
}
