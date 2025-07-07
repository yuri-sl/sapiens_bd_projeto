"use client";
import { useState } from "react";
import { User, GraduationCap, Users, FolderKanban, BookOpenText } from "lucide-react";
import Navbar from "../_components/navbar";
import TabelaUsuario from "../_components/Coordenador/tabelaUsuario";
import ProfessorTabela from "../_components/Coordenador/tabelaProfessor";
import AlunoTabela from "../_components/Coordenador/tabelaAluno";
import TabelaDepartamento from "../_components/Coordenador/tabelaDepartamento";
import EspecialidadePesquisa from "../_components/Coordenador/especialidadePesquisa";
import AreaPesquisa from "../_components/Coordenador/areaPesquisa";

export default function Home() {
  const [abaPrincipal, setAbaPrincipal] = useState<"usuarios" | "projetos" | "areas" | null>("usuarios");
  const [abaUsuarios, setAbaUsuarios] = useState<"todos" | "professores" | "alunos">("todos");
  const [abaCategorias, setAbaCategorias] = useState<"areas" | "especialidades">("areas");

  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h1 className="text-3xl font-bold text-center mb-6">PÁGINA PRINCIPAL DO COORDENADOR</h1>

        <div className="flex justify-center gap-4 mb-6">
          <button onClick={() => setAbaPrincipal("usuarios")} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            <Users size={20} /> Usuários
          </button>
          <button onClick={() => setAbaPrincipal("projetos")} className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            <FolderKanban size={20} /> Projetos
          </button>
          <button onClick={() => setAbaPrincipal("areas")} className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
            <BookOpenText size={20} /> Categorias
          </button>
        </div>

        {abaPrincipal === "usuarios" && (
          <div>
            <div className="flex justify-center gap-4 mb-4 border-b-2 border-gray-300 pb-2">
              <button onClick={() => setAbaUsuarios("todos")} className="flex items-center gap-2 bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">
                <User size={18} /> Todos
              </button>
              <button onClick={() => setAbaUsuarios("professores")} className="flex items-center gap-2 bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">
                <GraduationCap size={18} /> Professores
              </button>
              <button onClick={() => setAbaUsuarios("alunos")} className="flex items-center gap-2 bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">
                <Users size={18} /> Alunos
              </button>
            </div>

            <div className="mt-4">
              {abaUsuarios === "todos" && <TabelaUsuario />}
              {abaUsuarios === "professores" && <ProfessorTabela />}
              {abaUsuarios === "alunos" && <AlunoTabela />}
            </div>
          </div>
        )}

        {abaPrincipal === "projetos" && (
          <div className="mt-4 border-t-2 pt-4 border-gray-300">
            <TabelaDepartamento />
          </div>
        )}

        {abaPrincipal === "areas" && (
          <div>
            <div className="flex justify-center gap-4 mb-4 border-b-2 border-gray-300 pb-2">
              <button onClick={() => setAbaCategorias("areas")} className="flex items-center gap-2 bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">
                Áreas
              </button>
              <button onClick={() => setAbaCategorias("especialidades")} className="flex items-center gap-2 bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">
                Especialidades
              </button>
            </div>

            <div className="mt-4">
              {abaCategorias === "areas" && <AreaPesquisa />}
              {abaCategorias === "especialidades" && <EspecialidadePesquisa />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
