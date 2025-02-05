"use client";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuLink,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { auth } from "@/auth";
// import useRoles from "@/hooks/useRoles";
import React, { useEffect, useState } from "react";
import { getSession, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function HeaderComponent() {
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };
  const router = useRouter();
  //   const { isPatient, isSecretary, isDoctor } = useRoles();
  const { data: session, status } = useSession();

  return (
    <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6 bg-cyan-950">
      <Link
        href="#"
        className="mr-6 flex items-center text-white font-bold"
        prefetch={false}
      >
        Boiler Producciones
      </Link>
      <NavigationMenu className="ml-auto hidden lg:flex">
        <NavigationMenuList>
          {session ? (
            <>
              <NavigationMenuLink asChild>
                <Link
                  href="/inicio"
                  className={`group inline-flex h-9 w-max items-center text-white justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 hover:underline underline-offset-4 hover:decoration-cyan-600 ${
                    activeLink === "Inicio"
                      ? "underline decoration-cyan-500"
                      : ""
                  }`}
                  onClick={() => handleLinkClick("Inicio")}
                  prefetch={false}
                >
                  Inicio
                </Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link
                  href="/eventos"
                  className={`group inline-flex h-9 w-max items-center justify-center text-white rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 hover:underline underline-offset-4 hover:decoration-cyan-600 ${
                    activeLink === "Eventos"
                      ? "underline decoration-cyan-500"
                      : ""
                  }`}
                  onClick={() => handleLinkClick("Eventos")}
                  prefetch={false}
                >
                  Eventos
                </Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link
                  href="/usuarios"
                  className={`group inline-flex h-9 w-max items-center justify-center text-white rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 hover:underline underline-offset-4 hover:decoration-cyan-600 ${
                    activeLink === "Usuarios"
                      ? "underline decoration-cyan-500"
                      : ""
                  }`}
                  onClick={() => handleLinkClick("Usuarios")}
                  prefetch={false}
                >
                  Usuarios
                </Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <button
                  className={`group inline-flex h-9 w-max items-center justify-center text-white rounded-md px-4 py-2 text-sm font-bold transition-colors hover:bg-red-200 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 ${
                    activeLink === "Salir" ? "" : ""
                  }`}
                  onClick={() => signOut()}
                >
                  Salir
                </button>
              </NavigationMenuLink>
            </>
          ) : null}
        </NavigationMenuList>
      </NavigationMenu>
      {session ? (
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="ml-auto lg:hidden">
              <MenuIcon className="h-6 w-6 text-black" />
              <span className="sr-only">Menú de navegación</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <div className="grid gap-2 py-6">
              <>
                <Link
                  href="/inicio"
                  className="flex w-full items-center py-2 text-lg font-semibold"
                  onClick={() => handleLinkClick("Inicio")}
                  prefetch={false}
                >
                  Inicio
                </Link>
                <Link
                  href="/mi-perfil"
                  className="flex w-full items-center py-2 text-lg font-semibold"
                  onClick={() => handleLinkClick("Mi Perfil")}
                  prefetch={false}
                >
                  Mi Perfil
                </Link>
                <Link
                  href="/mis-estudios"
                  className="flex w-full items-center py-2 text-lg font-semibold"
                  onClick={() => handleLinkClick("Mis Estudios")}
                  prefetch={false}
                >
                  Mis Estudios
                </Link>
                <Link
                  href="/reportes"
                  className="flex w-full items-center py-2 text-lg font-semibold"
                  onClick={() => handleLinkClick("Reportes")}
                  prefetch={false}
                >
                  Reportes
                </Link>
                <button
                  className="flex w-full items-center py-2 text-lg font-semibold"
                  onClick={() => signOut()}
                >
                  Salir
                </button>
              </>
            </div>
          </SheetContent>
        </Sheet>
      ) : null}
    </header>
  );
}

function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}
