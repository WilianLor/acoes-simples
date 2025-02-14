"use client";

export interface StatsCardsProps {
  positionValue: number;
  quantity: number;
  averagePrice: number;
  currentPrice: number;
}

export function StatsCards({
  averagePrice,
  positionValue,
  quantity,
  currentPrice,
}: StatsCardsProps) {
  const diff = (currentPrice - averagePrice) / (averagePrice / 100);

  return (
    <div className="flex gap-4 w-fit">
      <div className="bg-zinc-900 px-4 py-3 flex flex-col items-center justify-center w-fit rounded-lg border border-zinc-800">
        <div className="flex flex-row items-center justify-center gap-5">
          <div className="flex flex-col items-center justify-center w-fit">
            <span className="text-sm text-yellow-500">Preço Atual</span>
            <p className="text-xl font-bold text-white">
              R$ {currentPrice.toFixed(2)}
            </p>
          </div>
          <div className="flex flex-col items-center justify-center w-fit">
            <span className="text-sm text-yellow-500">Preço Médio</span>
            <p className="text-xl font-bold text-white">
              R$ {averagePrice.toFixed(2)}
            </p>
          </div>
          <div className="flex flex-col items-center justify-center w-fit">
            <span className="text-sm text-yellow-500">Valorização</span>
            <p
              className={`text-xl font-bold ${
                currentPrice >= averagePrice ? "text-green-500" : "text-red-500"
              }`}
            >
              {diff >= 0 ? `+${diff.toFixed(2)}` : `${diff.toFixed(2)}`}%
            </p>
          </div>
        </div>
      </div>
      <div className="bg-zinc-900 px-4 py-3 flex flex-col items-center justify-center w-fit rounded-lg border border-zinc-800">
        <span className="text-sm text-yellow-500">Cotas</span>
        <p className="text-xl font-bold text-white">{quantity}</p>
      </div>
      <div className="bg-zinc-900 px-4 py-3 flex flex-col items-center justify-center w-fit rounded-lg border border-zinc-800">
        <span className="text-sm text-yellow-500">Valor da posição</span>
        <p className="text-xl font-bold text-white">
          R$ {positionValue.toFixed(2)}
        </p>
      </div>
    </div>
  );
}
