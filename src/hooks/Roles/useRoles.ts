"use client";
import { Role } from "@/common/enums/role.enum";
import { useSession } from "next-auth/react";

const useRoles = () => {
  const { data: session } = useSession();
  const roles = session?.user?.roles ?? [];

  const isAdmin = roles.includes(Role.Administrador);
  const isRRPPBoss = roles.includes(Role.JefePublicas);
  const isRRPP = roles.includes(Role.RRPP);

  return { isAdmin, isRRPPBoss, isRRPP };
};

export default useRoles;
