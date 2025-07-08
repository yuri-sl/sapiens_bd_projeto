import React from "react";
import { api } from "~/trpc/react";

interface Props {
  onClose: () => void;
  onConfirm: () => void;
  matricula: number;
  nomeProfessor: string;
}

export default function RemoveProfessor({ onClose, onConfirm, matricula, nomeProfessor }: Props) {
  const deletar = api.usuario.deletarProfessor.useMutation({
    onSuccess:  () => {
      onConfirm();
      onClose();
    },
  });

  const handleSubmit = () => {
    deletar.mutate({ matricula });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white w-full max-w-4xl rounded-lg p-6 border-4 border-red-700 shadow-lg">
        <h1 className="font-bold text-red-800 text-xl mb-4">Remover professor</h1>
        <p>
          Tem certeza que deseja remover o professor{" "}
          <span className="font-bold">{nomeProfessor}</span> do sistema?
        </p>
        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={handleSubmit}
            disabled={deletar.isLoading}
            className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded font-bold disabled:opacity-50"
          >
            {deletar.isLoading ? "Removendo..." : "Sim"}
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
