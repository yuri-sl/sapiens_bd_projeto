import React from "react";
import LoginBox from "../_components/loginBox";

export default function LoginPage() {
  return (
    <div>
      <nav className="flex h-20 items-center justify-center bg-blue-500 px-5">
        <img src="/assets/SAPIENS.png" className="w-24" alt="Sapiens Logo" />
      </nav>
      <div className="flex items-center justify-center">
        <LoginBox></LoginBox>
      </div>
    </div>
  );
}
