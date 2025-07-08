import React, { useState } from "react";
import { api } from "~/trpc/react";

interface Props {
    onClose: () => void;
    onConfirm: () => void;
    especialidade: {
        idarea: number;
        nomearea: string;
        idespecialidade: number;
        nomeespecialidade: string;
    }
};

export default function EditEspecialidade({ onClose, onConfirm, especialidade }: Props) {
    const atualizarEspecialidade = api.area.editarEspecialidadeProcedure.useMutation({
        onSuccess: () => {
          onConfirm(); // chama refetch + fecha modal no componente pai
        },

        onError: (error) => {
            const match = error.message.match(/Message: `(?:ERROR:\s*)?([^`]*)`/);
            const mensagem = match?.[1] || error.message;
            alert('Erro ao atualizar: ' + mensagem);
        },
    });

    const [nomeEspecialidade, setNomeEspecialidade] = useState(especialidade.nomeespecialidade);
    const [novoIdArea, setNovoIdArea] = useState(especialidade.idarea);


    const handleSubmit = () => {
        if (!nomeEspecialidade || !novoIdArea) {
            alert('Erro ao atualizar: Preencha os dados solicitados')
            return;
        };
        atualizarEspecialidade.mutate({ novoIdArea: novoIdArea, antigoIdArea: especialidade.idarea, idEspecialidade: especialidade.idespecialidade, nomeEspecialidade: nomeEspecialidade });
    };
    
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 bg-opacity-90">
            <div className="bg-white w-full max-w-4xl rounded-lg p-6 border-4 border-cyan-700 shadow-lg">
                <h1 className="font-bold text-blue-900 text-xl mb-4">Atualizar Especialidade</h1>

                <div className="flex flex-col gap-2 w-1/2">
                    <label>Novo nome</label>
                    <input type="text" required value={nomeEspecialidade} onChange={(e) => setNomeEspecialidade(e.target.value)} className="bg-gray-100 p-2 rounded" />
                </div>

                <div className="flex flex-col gap-2 w-1/2">
                    <label>ID da nova área relacionada</label>
                    <input type="number" required value={novoIdArea} onChange={(e) => setNovoIdArea(Number(e.target.value))} className="bg-gray-100 p-2 rounded" />
                </div>


                <div className="mt-6 flex justify-end gap-4">
                    <button
                        onClick={handleSubmit}
                        className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded font-bold"
                    >
                        Atualizar
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