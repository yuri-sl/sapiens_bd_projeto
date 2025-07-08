import React, { useEffect, useState } from "react";
import { api } from "~/trpc/react";

interface AreaComEspecialidades {
  idarea: number;
  nomearea: string;
  idespecialidade: number;
  nomeespecialidade: string;
}

interface Professor {
  matricula: number;
  nome: string;
}

export default function AddNewProjeto({ onClose }: { onClose: () => void }) {
  const { data: areasData } = api.area.listarAreasView.useQuery();
  const { data: professores } = api.usuario.listarProfessoresView.useQuery();
  const cadastrarProjeto = api.pesquisa.cadastrarProjeto.useMutation();

  const [areasUnicas, setAreasUnicas] = useState<{ id: number; nome: string }[]>([]);
  const [especialidadesFiltradas, setEspecialidadesFiltradas] = useState<{ id: number; nome: string }[]>([]);

  const [areaSelecionada, setAreaSelecionada] = useState<number | null>(null);
  const [especialidadeSelecionada, setEspecialidadeSelecionada] = useState<number | null>(null);
  const [professorSelecionado, setProfessorSelecionado] = useState<number | null>(null);

  const [titulo, setTitulo] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [pdf, setPdf] = useState<File | null>(null);

  useEffect(() => {
    if (areasData) {
      const unicas = Array.from(
        new Map(areasData.map((a: AreaComEspecialidades) => [a.idarea, { id: a.idarea, nome: a.nomearea }])).values()
      );
      setAreasUnicas(unicas);
    }
  }, [areasData]);

  useEffect(() => {
    if (areasData && areaSelecionada !== null) {
      const especialidades = areasData
        .filter((a: AreaComEspecialidades) => a.idarea === areaSelecionada)
        .map((e: AreaComEspecialidades) => ({
          id: e.idespecialidade,
          nome: e.nomeespecialidade,
        }));
      setEspecialidadesFiltradas(especialidades);
    } else {
      setEspecialidadesFiltradas([]);
    }
  }, [areaSelecionada, areasData]);

  async function handleSubmit() {
    const buffer = pdf ? await pdf.arrayBuffer() : undefined;

    cadastrarProjeto.mutate({
      titulopesquisa: titulo,
      datainicio: dataInicio,
      datafim: dataFim,
      estadopesquisa: "Planejada",
      vagasvoluntarias: 2,
      vagasremuneradas: 2,
      idespecialidade: especialidadeSelecionada!,
      idprofessor: professorSelecionado!,
      iddepartamento: areaSelecionada!,
      relatorio: buffer ? Buffer.from(buffer) : undefined,
    });
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 bg-opacity-90">
      <div className="bg-white w-full max-w-4xl rounded-lg p-6 border-4 border-cyan-700 shadow-lg">
        <h1 className="font-bold text-blue-900 text-xl mb-4">Informações Gerais</h1>

        <div className="flex justify-between gap-6">
          <div className="flex flex-col gap-2 w-1/2">
            <label>Título da Pesquisa</label>
            <input className="bg-gray-100 p-2 rounded" value={titulo} onChange={(e) => setTitulo(e.target.value)} />

            <label>Área do projeto</label>
            <select
              className="bg-gray-100 p-2 rounded"
              onChange={(e) => setAreaSelecionada(Number(e.target.value))}
              value={areaSelecionada ?? ""}
            >
              <option value="">Selecione uma área</option>
              {areasUnicas.map((area) => (
                <option key={area.id} value={area.id}>
                  {area.nome}
                </option>
              ))}
            </select>

            <label>Especialidade</label>
            <select
              className="bg-gray-100 p-2 rounded"
              onChange={(e) => setEspecialidadeSelecionada(Number(e.target.value))}
              value={especialidadeSelecionada ?? ""}
              disabled={!areaSelecionada}
            >
              <option value="">Selecione uma especialidade</option>
              {especialidadesFiltradas.map((esp) => (
                <option key={esp.id} value={esp.id}>
                  {esp.nome}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2 w-1/2">
            <label>Professor Associado</label>
            <select
              className="bg-gray-100 p-2 rounded"
              onChange={(e) => setProfessorSelecionado(Number(e.target.value))}
              value={professorSelecionado ?? ""}
            >
              <option value="">Selecione um professor</option>
              {professores?.map((prof: Professor) => (
                <option key={prof.matricula} value={prof.matricula}>
                  {prof.nome}
                </option>
              ))}
            </select>

            <label>Data de início</label>
            <input type="date" className="bg-gray-100 p-2 rounded" value={dataInicio} onChange={(e) => setDataInicio(e.target.value)} />

            <label>Data de fim</label>
            <input type="date" className="bg-gray-100 p-2 rounded" value={dataFim} onChange={(e) => setDataFim(e.target.value)} />

            <label>Inserir relatório em PDF</label>
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setPdf(e.target.files?.[0] ?? null)}
              className="bg-gray-100 p-2 rounded"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={handleSubmit}
            className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded font-bold"
          >
            Cadastrar novo projeto
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
