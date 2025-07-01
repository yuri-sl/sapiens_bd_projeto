export default function InformationsComponentCoord() {
    return (
        <div>
            <h1 className="font-bold text-blue-900">Informações Gerais</h1>
            <div className="bg-gray-200 font-bold w-full max-w-4xl border-8 border-cyan-700 rounded-lg p-6">
                <div className="flex justify-between gap-3">
                    <div className="w-fit flex flex-col gap-2">
                        <h3 className="rounded-lg ">Matrícula</h3>
                        <input className="bg-white rounded-md" />
                        <h3 className="rounded-lg ">Nome</h3>
                        <input className="bg-white rounded-md" />
                        <h3 className="rounded-lg ">Email</h3>
                        <input className="bg-white rounded-md" />
                        <h3 className="rounded-lg ">Senha</h3>
                        <input className="bg-white rounded-md" />
                    </div>

                    <div className="w-fit flex flex-col gap-2">
                        <h3 className="rounded-lg ">CPF</h3>
                        <input className="bg-white rounded-md" />
                        <h3 className="rounded-lg ">Início como coordenador</h3>
                        <input className="bg-white rounded-md" />
                        <h3 className="rounded-lg ">Fim do período como coordenador</h3>
                        <input className="bg-white rounded-md" />
                    </div>
                </div>

                <div className="mt-6 flex gap-4 text-center">
                    <button className="bg-green-500  font-bold hover:bg-green-700 px-4 py-2 rounded-md">
                        Salvar Alterações
                    </button>
                    <button className="bg-red-500  font-bold hover:bg-red-700 px-4 py-2 rounded-md">
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
}
