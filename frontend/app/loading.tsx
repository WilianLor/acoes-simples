"use client";
import { PacmanLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="w-full h-screen flex items-center flex-col justify-center gap-2 bg-black text-white font-bold">
      <PacmanLoader size={30} color="white" />
      <p>Estamos carregando o site</p>
    </div>
  );
}
