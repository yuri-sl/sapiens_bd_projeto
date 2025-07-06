"use client";
import React from "react";

export default function Navbar() {
  return (
    <nav className="bg-blue-500 px-5">
      <ul className="flex items-center px-4 py-4 text-white">
        <li>
          <a href="#">
            <img
              src="/assets/SAPIENS.png"
              className="w-24"
              alt="Sapiens Logo"
            />
          </a>
        </li>
        <li className="flex-1 text-4xl font-bold hover:text-cyan-800">
          <a href="#">Página Inicial</a>
        </li>
        <li className="flex-1 text-4xl font-bold hover:text-cyan-800">
          <a href="#" className="w-fit">
            Minha Área
          </a>
        </li>
        <li>
        <button className="bg-red-600 rounded-lg w-56 h-10">Sair do Sistema</button>
        </li>
        <li>
          <a href="#">
            <img src="/assets/user-128.png" className="w-24" alt="User Logo" />
          </a>
        </li>
      </ul>
    </nav>
  );
}
