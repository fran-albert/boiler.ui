"use client";
import React, { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { PasswordInput } from "@/components/Input/Password/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn as signInNextAuth } from "next-auth/react";
import Loading from "@/app/loading";
import { loginSchema } from "@/validators/login.schema";
import { loginAction } from "@/api/Auth/auth";
import { Label } from "@/components/ui/label";

const LoginComponent = () => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string[] | null>(null);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const router = useRouter();

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setError(null);
    startTransition(async () => {
      const result: any = await signInNextAuth("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });
      console.log(result);
      if (result?.error) {
        setError(["Credenciales Incorrectas."]);
      } else {
        if (result?.ok) {
          setIsRedirecting(true);
          router.push("/inicio");
        }
      }
    });
  }

  return (
    <div className="mt-4">
      {/* <div className="flex items-center justify-center bg-background md:w-96">
        <div className="w-full max-w-md p-6 space-y-6 bg-card rounded-lg shadow-lg">
          <div className="text-center">
            <p className="text-muted-foreground">Inicia sesión en tu cuenta</p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black">
                      Correo Electrónico o D.N.I.
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                    <FormLabel className="text-black">Contraseña</FormLabel>
                    <FormControl>
                      <PasswordInput {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {error && <p className="text-red-500">{error}</p>}
              <div className="flex items-center justify-between">
                <Button
                  type="submit"
                  className="w-full text-white font-bold"
                  variant="cyan"
                  disabled={isPending}
                >
                  {isPending ? "Iniciando..." : "Iniciar sesión"}
                </Button>
              </div>
            </form>
          </Form>
          <div className="text-center text-muted-foreground">
            <Link href="/restablecer-contrase%C3%B1a">
              ¿Has olvidado tu contraseña?
            </Link>
          </div>
        </div>
      </div> */}
      <div className="mx-auto max-w-sm space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Iniciar sesión</h1>
          <p className="text-muted-foreground">
            Ingresa tu correo electrónico para acceder a tu cuenta.
          </p>
        </div>
        <div className="space-y-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black">
                      Correo Electrónico
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                    <FormLabel className="text-black">Contraseña</FormLabel>
                    <FormControl>
                      <PasswordInput {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {error && <p className="text-red-500">{error}</p>}
              <div className="flex items-center justify-between">
                <Button
                  type="submit"
                  className="w-full text-white font-bold"
                  variant="cyan"
                  disabled={isPending}
                >
                  {isPending ? "Iniciando..." : "Iniciar sesión"}
                </Button>
              </div>
            </form>
          </Form>
          <div className="text-center text-muted-foreground">
            {/* <Link href="/restablecer-contrase%C3%B1a">
              ¿Olvidaste tu contraseña?
            </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
