"use client";

export function StatsCards() {
  return (
    <div className="flex gap-4 w-fit">
      <div className="bg-zinc-900 px-4 py-3 flex flex-col items-center justify-center w-fit rounded-lg border border-zinc-800">
        <span className="text-sm text-yellow-500">Preço Médio</span>
        <p className="text-xl font-bold text-white">R$ 9,59</p>
      </div>
      <div className="bg-zinc-900 px-4 py-3 flex flex-col items-center justify-center w-fit rounded-lg border border-zinc-800">
        <span className="text-sm text-yellow-500">Cotas</span>
        <p className="text-xl font-bold text-white">667</p>
      </div>
      <div className="bg-zinc-900 px-4 py-3 flex flex-col items-center justify-center w-fit rounded-lg border border-zinc-800">
        <span className="text-sm text-yellow-500">Valor da posição</span>
        <p className="text-xl font-bold text-white">R$ 1999,99</p>
      </div>
    </div>
  );
}