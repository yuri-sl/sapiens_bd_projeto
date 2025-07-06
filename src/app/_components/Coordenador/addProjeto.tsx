import React from "react";

export default function AddNewProjeto({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50  0 bg-opacity-90">
      <div className="bg-white w-full max-w-4xl rounded-lg p-6 border-4 border-cyan-700 shadow-lg">
        <h1 className="font-bold text-blue-900 text-xl mb-4">Informações Gerais</h1>

        <div className="flex justify-between gap-6">
          <div className="flex flex-col gap-2 w-1/2">
            <label>Título da Pesquisa</label>
            <input className="bg-gray-100 p-2 rounded" />
            <label>Área do projeto</label>
            <select className="bg-gray-100 p-2 rounded" />
            <label>Especialidade</label>
            <select className="bg-gray-100 p-2 rounded" />
            <label>Senha</label>
            <input type="password" className="bg-gray-100 p-2 rounded" />
          </div>

          <div className="flex flex-col gap-2 w-1/2">
            <label>Professor Associado</label>
            <select className="bg-gray-100 p-2 rounded" />
            <label>Início como coordenador</label>
            <input type="date" className="bg-gray-100 p-2 rounded" />
            <label>Fim do período do projeto</label>
            <input type="date" className="bg-gray-100 p-2 rounded" />
                <label>Inserir relatório em PDF</label>
            <div className="align-center">
                <button className="bg-gray-500 rounded-lg w-50">Click me!</button>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <button className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded font-bold">
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
