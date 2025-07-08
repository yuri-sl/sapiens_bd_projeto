import React, { useState } from "react";
import { api } from "~/trpc/react";

export default function AddNewArea({ onClose, onConfirm }: { onClose: () => void, onConfirm: () => void}) {
    const criarArea = api.area.cadastrarAreaProcedure.useMutation({
        onSuccess: () => {
          onConfirm(); // chama refetch + fecha modal no componente pai
        },
        onError: (error) => {
            const match = error.message.match(/Message: `(?:ERROR:\s*)?([^`]*)`/);
            const mensagem = match?.[1] || error.message;
            alert('Erro ao cadastrar: ' + mensagem);
        },
    });

    const [nomeArea, setNomeArea] = useState('');
    const [idDep, setIdDep] = useState(0);


    const handleSubmit = () => {
        if (!nomeArea || !idDep) {
            alert('Erro ao cadastrar: Preencha os dados solicitados')
            return;
        };
        criarArea.mutate({ nomeArea : nomeArea, idDep: idDep });
    };
    
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 bg-opacity-90">
            <div className="bg-white w-full max-w-4xl rounded-lg p-6 border-4 border-cyan-700 shadow-lg">
                <h1 className="font-bold text-blue-900 text-xl mb-4">Adicionar nova Área</h1>

                <div className="flex flex-col gap-2 w-1/2">
                    <label>Nome da Área</label>
                    <input type="text" required value={nomeArea} onChange={(e) => setNomeArea(e.target.value)} className="bg-gray-100 p-2 rounded" />

                    <label>ID do Departamento Relacionado</label>
                    <input  type='number' required value={idDep} onChange={(e) => setIdDep(Number(e.target.value))} className="bg-gray-100 p-2 rounded" />
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