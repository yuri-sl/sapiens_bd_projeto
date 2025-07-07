import React, { useState } from "react";
import { api } from "~/trpc/react";

export default function AddNewEspecialidade({ onClose, onConfirm }: { onClose: () => void, onConfirm: () => void}) {
    const criarEspecialidade = api.area.cadastrarEspecialidadeProcedure.useMutation({
        onSuccess: () => {
          onConfirm(); // chama refetch + fecha modal no componente pai
        },
    });

    const [nomeEspecialidade, setNomeArea] = useState('');
    const [idArea, setIdDep] = useState(0);


    const handleSubmit = () => {
        if (!nomeEspecialidade || !idArea)
            return;
        criarEspecialidade.mutate({ nomeEspecialidade : nomeEspecialidade, idArea: idArea });
    };
    
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 bg-opacity-90">
            <div className="bg-white w-full max-w-4xl rounded-lg p-6 border-4 border-cyan-700 shadow-lg">
                <h1 className="font-bold text-blue-900 text-xl mb-4">Adicionar nova Área</h1>

                <div className="flex flex-col gap-2 w-1/2">
                    <label>Nome da Especialidade</label>
                    <input type="text" required value={nomeEspecialidade} onChange={(e) => setNomeArea(e.target.value)} className="bg-gray-100 p-2 rounded" />

                    <label>ID da Área Relacionada</label>
                    <input  type='number' required value={idArea} onChange={(e) => setIdDep(Number(e.target.value))} className="bg-gray-100 p-2 rounded" />
                </div>


                <div className="mt-6 flex justify-end gap-4">
                    <button
                        onClick={handleSubmit}
                        className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded font-bold"
                    >
                        Criar
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