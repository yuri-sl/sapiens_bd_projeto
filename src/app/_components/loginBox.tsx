import React from "react";
import { api } from "~/trpc/react";

export default function LoginBox() {
  return (
    <div className="3x1 m-4 flex h-full w-80 flex-col rounded-lg border-10 border-cyan-900 bg-gray-200">
      <h1 className="text-black-6x1 m-4 text-center font-bold">Fazer Login</h1>
      <h3 className="text-black-6x1 m-4 font-bold">Usuário:</h3>
      <input className="m-4 bg-gray-100"></input>
      <h3 className="text-black-6x1 m-4 font-bold">Senha:</h3>
      <input type="password" className="m-4 bg-gray-100"></input>
      <button className="m-4 mb-56 cursor-pointer rounded-md border-blue-700 bg-cyan-700 font-bold text-white hover:bg-cyan-900">
        Login
      </button>
    </div>
  );
}
