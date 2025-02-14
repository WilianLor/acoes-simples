import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

export function DashboardHeader() {
  const router = useRouter();

  return (
    <header className="flex justify-between items-center mb-8">
      <Image
        alt=""
        src={"/LOGO.png"}
        width={5000}
        height={1000}
        className=" w-[250px] h-auto "
      />
      <div className="flex gap-2 justify-center items-center">
        <Button
          variant="outline"
          aria-selected={true}
          onClick={() => router.push("/log")}
          className="bg-zinc-800 hover:bg-zinc-700 text-white aria-selected:bg-yellow-500 aria-selected:hover:bg-yellow-600 aria-selected:text-black"
        >
          Transações
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            signOut({ callbackUrl: "/login" });
          }}
        >
          <LogOut size={25} className="text-amber-400" />
        </Button>
      </div>
    </header>
  );
}
