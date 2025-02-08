import { AuthTabs } from "@/components/auth/auth-tabs";
import Image from "next/image";

export default function Home() {
    return (
        <main className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-md flex flex-col gap-4">

                <Image alt="" src={'/LOGO.png'} width={5000} height={1000} className=" w-[400px] h-auto mx-auto" />
                <AuthTabs />
            </div>
        </main>
    );
}