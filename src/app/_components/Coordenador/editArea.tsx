import React, { useState } from "react";
import { api } from "~/trpc/react";

interface Props {
    onClose: () => void;
    onConfirm: () => void;
    area: {
        idarea: number;
        nomearea: string;
    }
};

export default function EditArea({ onClose, onConfirm, area }: Props) {
    const atualizarArea = api.area.editarAreaProcedure.useMutation({
        onSuccess: () => {
          onConfirm(); // chama refetch + fecha modal no componente pai
        },
    });

    const [nomeArea, setNomeArea] = useState(area.nomearea);


    const handleSubmit = () => {
        if (!nomeArea) {
            alert('Erro ao atualizar: Preencha os dados solicitados')
            return;
        };
        atualizarArea.mutate({ nomeArea: nomeArea, idArea: area.idarea });
    };
    
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 bg-opacity-90">
            <div className="bg-white w-full max-w-4xl rounded-lg p-6 border-4 border-cyan-700 shadow-lg">
                <h1 className="font-bold text-blue-900 text-xl mb-4">Atualizar Área</h1>

                <div className="flex flex-col gap-2 w-1/2">
                    <label>Novo nome</label>
                    <input type="text" required value={nomeArea} onChange={(e) => setNomeArea(e.target.value)} className="bg-gray-100 p-2 rounded" />
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