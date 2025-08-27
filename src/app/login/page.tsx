"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [alert, setAlert] = useState<{
    type: "error" | "success";
    message: string;
  } | null>(null);
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAlert(null);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      const data = await res.json();

      if (!res.ok) {
        setAlert({
          type: "error",
          message: data.erro || "Erro ao fazer login",
        });
        setTimeout(() => setAlert(null), 5000);
      } else {
        setAlert({ type: "success", message: "Login realizado com sucesso" });

        setTimeout(() => {
          setAlert(null);
          router.push("/");
        }, 1000);
      }
    } catch {
      setAlert({ type: "error", message: "Erro de conexão com o servidor" });
    }
  }

  return (
    <div className="flex w-full h-[95vh] items-center justify-center">
      <Card className="w-full max-w-sm">
        <Image
          src="/02 - Logo ZCBR Retangular.png"
          alt="Imagem Externa"
          width={300}
          height={1}
          className="mb-4 mt-4 self-center"
        />
        <CardHeader>
          <CardTitle>Acesse sua conta</CardTitle>
          <CardDescription>
            Digite seu e-mail abaixo para acessar sua conta
          </CardDescription>
          <CardAction>
            <Button variant="link">Cadastre-se</Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          {/* ALERTA DE ERRO OU SUCESSO */}
          {alert && (
            <div
              className={`fixed bottom-4 right-4 z-500 w-[300px] bg-white border-l-4 rounded ${
                alert.type === "error" ? "border-red-500" : "border-green-500"
              }`}
            >
              <Alert
                variant={alert.type === "error" ? "destructive" : "default"}
                className="mb-4 border-none"
              >
                <AlertTitle>
                  {alert.type === "error" ? "Erro" : "Sucesso"}
                </AlertTitle>
                <AlertDescription>{alert.message}</AlertDescription>
              </Alert>
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Senha</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Esqueceu sua senha?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                />
              </div>
            </div>
            <Button type="submit" className="w-full mt-5">
              Login
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2"></CardFooter>
      </Card>
    </div>
  );
}
