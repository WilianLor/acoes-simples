"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginForm } from "./login-form";
import { useState } from "react";
import SubscribeForm from "./subscribe-form";

export function AuthTabs() {
  const [tabs, setTabs] = useState<string>("login");
  return (
    <div className="flex flex-col items-center space-y-6 w-full max-w-md mx-auto p-6 bg-zinc-900 rounded-lg">
      <Tabs
        value={tabs}
        onValueChange={(e) => setTabs(e)}
        defaultValue="login"
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Entrar</TabsTrigger>
          <TabsTrigger value="subscribe">Cadastrar-se</TabsTrigger>
        </TabsList>
        <TabsContent value="login" className="space-y-4">
          <div className="text-sm text-center text-zinc-400">
            Bem vindo de volta! Por favor, insira seus dados.
          </div>
          <LoginForm />
        </TabsContent>
        <TabsContent value="subscribe" className="space-y-4">
          <div className="text-sm text-center text-zinc-400">
            Crie uma conta para começar.
          </div>
          <SubscribeForm onSubscribe={() => setTabs("login")} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
