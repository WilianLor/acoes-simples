"use client";

import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function DashboardHeader() {
  return (
    <header className="flex justify-between items-center mb-8">
      <Image alt="" src={'/LOGO.png'} width={5000} height={1000} className=" w-[250px] h-auto " />
      <Button variant="ghost" size="icon">
        <LogOut size={25} className="text-amber-400" />
      </Button>
    </header>
  );
}