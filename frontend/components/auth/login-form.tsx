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
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Mail } from "lucide-react";
import axios from "axios";
import { useForm } from "react-hook-form";
import type * as z from "zod";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { loginValidator } from "@/lib/validators/authValidator";
import { signIn } from "next-auth/react";

export function LoginForm() {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof loginValidator>>({
    resolver: zodResolver(loginValidator),
    defaultValues: {
      mail: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginValidator>) {
    try {
      const res = await signIn("credentials", {
        redirect: false,
        mail: values.mail,
        password: values.password,
      });

      if (res && (res.status === 200 || res.status === 201)) {
        toast({
          variant: "default",
          title: "Login Bem-Sucedido",
          description: "Redirecionando para o Home...",
        });
        router.push("/home");
      } else {
        toast({
          variant: "destructive",
          title: "Erro - Login",
          description: "Usuário e/ou Senha Incorreto",
        });
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        const errorMessage =
          error.response?.data?.message || "Usuário e/ou Senha Incorreto";
        toast({
          variant: "destructive",
          title: "Erro - Login",
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="mail"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Mail className="h-4 w-4" /> E-mail
              </FormLabel>
              <FormControl>
                <Input placeholder="Coloque seu email" {...field} />
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
                  placeholder="Coloque sua senha"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Entrar
        </Button>
      </form>
    </Form>
  );
}
