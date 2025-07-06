export function PhotoComponent(){
    return(
        <div className="bg-gray-200 text-center min-h-auto font-bold w-full max-w-4xl border-8 border-cyan-700 rounded-lg p-6">
            <img src="/assets/user-128.png" alt="Imagem do maluco"/>
            <button className="bg-green-500  font-bold hover:bg-green-700 px-4 py-2 rounded-md">
            Adicionar nova foto
            </button>
            <button className="bg-red-500  font-bold hover:bg-red-700 px-4 py-2 rounded-md">
            Remover foto
            </button>
        </div>
    )
}