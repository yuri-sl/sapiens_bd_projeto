import React from "react";
import { api } from "~/trpc/react";

interface Props {
  onClose: () => void;
  onConfirm: () => void;
  idEspecialidade: number;
  nomeEspecialidade: string;
}

export default function DeleteEspecialidade({ onClose, onConfirm, idEspecialidade, nomeEspecialidade }: Props) {
  const deletarEspecialidade = api.area.deletarEspecialidade.useMutation({
    onSuccess: () => {
      onConfirm(); // chama refetch + fecha modal no componente pai
    },
  });

  const handleSubmit = () => {
    deletarEspecialidade.mutate({ idespecialidade: idEspecialidade });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 bg-opacity-90">
      <div className="bg-white w-full max-w-4xl rounded-lg p-6 border-4 border-red-700 shadow-lg">
        <h1 className="font-bold text-red-800 text-xl mb-4">Remover especialidade</h1>

        <div className="flex justify-between gap-6">
          <div className="flex flex-col gap-2 w-full">
            <p className="text-gray-800">
              Tem certeza de que deseja remover a especialidade{" "}
              <span className="font-bold">{nomeEspecialidade}</span> do sistema?
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={handleSubmit}
            disabled={deletarEspecialidade.isLoading}
            className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded font-bold disabled:opacity-50"
          >
            {deletarEspecialidade.isLoading ? "Removendo..." : "Sim"}
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
