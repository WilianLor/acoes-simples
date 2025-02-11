"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { registerValidator } from "@/lib/validators/authValidator";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { KeyRound, Lock, Mail, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import type * as z from "zod";

const SubscribeForm = ({ onSubscribe }: { onSubscribe: () => void }) => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof registerValidator>>({
    resolver: zodResolver(registerValidator),
    defaultValues: {
      name: "",
      mail: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof registerValidator>) {
    try {
      const res = await axios.post("http://localhost:3031/auth/register/", {
        name: values.name,
        mail: values.mail,
        password: values.password,
      });

      if (res.status === 200 || res.status === 201) {
        toast({
          variant: "default",
          title: "Registro Bem-Sucedido",
          description:
            "Conta criada com sucesso! Agora insira suas credenciais para realizar o login.",
        });
        onSubscribe();
      } else {
        toast({
          variant: "destructive",
          title: "Erro - Registro",
          description: "Não foi possível criar a conta. Tente novamente.",
        });
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        const errorMessage =
          error.response?.data?.message ||
          "Dados inválidos. Verifique e tente novamente.";
        toast({
          variant: "destructive",
          title: "Erro - Registro",
          description: errorMessage,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Erro na Conexão",
          description:
            "Não foi possível conectar ao servidor. Tente novamente.",
        });
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <User className="h-4 w-4" /> Nome
              </FormLabel>
              <FormControl>
                <Input placeholder="Escreva seu nome" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="mail"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Mail className="h-4 w-4" /> E-mail
              </FormLabel>
              <FormControl>
                <Input placeholder="Escreva seu e-mail" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Lock className="h-4 w-4" /> Senha
              </FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Escreva uma senha"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <KeyRound className="h-4 w-4" /> Confirme sua Senha
              </FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Respita a senha"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Cadastrar-se
        </Button>
      </form>
    </Form>
  );
};

export default SubscribeForm;
