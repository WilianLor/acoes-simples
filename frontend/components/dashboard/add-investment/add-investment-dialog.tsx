"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import axiosAuth from "@/lib/service/axiosAuth";
import { useToast } from "@/hooks/use-toast";
import { debounce } from "lodash";

interface AddInvestmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  refetch?: () => Promise<void>;
}

export function AddInvestmentDialog({
  open,
  onOpenChange,
  refetch,
}: AddInvestmentDialogProps) {
  const { register, handleSubmit, control, setValue } = useForm();
  const { toast } = useToast();
  const [date, setDate] = useState<Date>(new Date());
  const [stocks, setStocks] = useState<any[]>([]); // Armazenando os dados de estoque
  const [isLoading, setIsLoading] = useState(false); // Controlando o estado de carregamento

  const fetchStocks = useCallback(
    debounce(async (search: string) => {
      if (!search) return;
      setIsLoading(true);
      try {
        const response = await axiosAuth.get(`/stock/search`, {
          params: {
            search: search,
            limit: 5,
          },
        });
        const data = response.data;
        setStocks(data);
      } catch (error) {
        console.error("Erro ao buscar ações:", error);
      } finally {
        setIsLoading(false);
      }
    }, 500),
    []
  );

  async function onSubmit(data: any) {
    const investmentData = {
      stock: data.stock,
      type: data.transactionType,
      quantity: parseInt(data.quantity),
      price: parseFloat(data.price),
      tax: parseFloat(data.tax) || 0,
      date: date,
    };

    try {
      await axiosAuth.post("/transaction", investmentData);

      onOpenChange(false);
      if (refetch) refetch();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro:",
        description:
          (error as any)?.response.data.message ||
          "Erro ao adicionar movimentação",
      });
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-zinc-900 border-zinc-800">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">
            Adicionar Investimento
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2 relative">
            <Label htmlFor="name" className="text-yellow-500">
              Nome
            </Label>
            <Input
              id="stock"
              placeholder="Insira o nome do investimento"
              required
              className="bg-zinc-800 border-zinc-700 text-white"
              {...register("stock")}
              onChange={(e) => {
                fetchStocks(e.target.value);
                setValue("stock", e.target.value);
              }}
            />

            {isLoading && (
              <div className="absolute z-10 mt-1 w-full bg-zinc-900 border border-zinc-700 rounded-md shadow-lg">
                <div className="p-2 hover:bg-zinc-700 cursor-pointer text-white">
                  Carregando...
                </div>
              </div>
            )}

            {stocks?.length > 0 && !isLoading && (
              <div className="absolute z-10 mt-1 w-full bg-zinc-900 border border-zinc-700 rounded-md shadow-lg">
                {stocks.map((stock: any, index: number) => (
                  <div
                    key={stock.id ?? `stock-${index}`}
                    className="p-2 hover:bg-zinc-700 cursor-pointer text-white"
                    onClick={() => {
                      setValue("stock", stock.stock);
                      setStocks([]);
                    }}
                  >
                    {stock.name} ({stock.stock})
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <div className="space-y-2 w-1/2">
              <Label className="text-yellow-500">Tipo de Transação</Label>
              <Controller
                name="transactionType"
                control={control}
                defaultValue="buy"
                render={({ field }) => (
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    required
                    className="flex gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="buy"
                        id="buy"
                        className="border-yellow-500 text-yellow-500"
                      />
                      <Label htmlFor="buy" className="text-white">
                        Compra
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="sale"
                        id="sale"
                        className="border-yellow-500 text-yellow-500"
                      />
                      <Label htmlFor="sale" className="text-white">
                        Venda
                      </Label>
                    </div>
                  </RadioGroup>
                )}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-yellow-500">Data</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Selecione uma data</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-zinc-800 border-zinc-700">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(selectedDate: Date | undefined) =>
                    setDate(selectedDate ?? new Date())
                  }
                  required
                  initialFocus
                  className="bg-zinc-800"
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="space-y-2">
            <Label htmlFor="quantity" className="text-yellow-500">
              Quantidade
            </Label>
            <Input
              id="quantity"
              type="number"
              required
              {...register("quantity")}
              className="bg-zinc-800 border-zinc-700 text-white"
              placeholder="Quantidade"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="price" className="text-yellow-500">
              Valor por cota
            </Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              required
              {...register("price")}
              className="bg-zinc-800 border-zinc-700 text-white"
              placeholder="Insira o valor por cota"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tax" className="text-yellow-500">
              Taxa de Corretagem
            </Label>
            <Input
              id="tax"
              type="number"
              step="0.01"
              required
              {...register("tax")}
              className="bg-zinc-800 border-zinc-700 text-white"
              placeholder="Insira a taxa de corretagem"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black"
          >
            Adicionar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
