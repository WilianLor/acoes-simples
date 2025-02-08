"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
	const router = useRouter();

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		router.push("/login");
	}, []); // Executa apenas uma vez após a renderização inicial

	return <div />;
}
