"use client";
import Loading from "@/app/loading";
import RrppTable from "@/components/Boss/Rrpp/Table";
import { ViewButton } from "@/components/Button/View/button";
import DataCard from "@/components/Events/ListCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search } from "@/components/ui/search";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DeleteUserDialog from "@/components/Users/Delete";
import { useEvents } from "@/hooks/Event/useEvents";
import useRoles from "@/hooks/Roles/useRoles";
import { useUser } from "@/hooks/User/useUser";
import { useUsers } from "@/hooks/User/useUsers";
import { CalendarIcon, UsersIcon, TrendingUpIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function InicioPage() {
  const { isRRPPBoss,isRRPP  } = useRoles();
  const { data: session } = useSession();
  const { user, isLoading } = useUser({
    auth: true,
    id: session?.user.id,
  });

  const {
    events,
    isLoading: isLoadingEvents,
    error,
  } = useEvents({
    auth: true,
    fetchEvents: true,
  });

  if (isLoading || isLoadingEvents) {
    return <Loading isLoading={true} />;
  }

  return (
    <div className="container mx-auto p-4">
      <header className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src={user?.photo} alt={user?.photo} />
            <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">
              Bienvenido, {user?.name} {user?.lastName}
            </h1>
            <p className="text-muted-foreground">
              {user?.roles.map((role) => role.name).join(", ")}
            </p>
          </div>
        </div>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Eventos Asistidos
            </CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Historias Publicadas
            </CardTitle>
            <TrendingUpIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Seguidores</CardTitle>
            <UsersIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
          </CardContent>
        </Card>
      </div>

      {isRRPPBoss && <RrppTable id={session?.user.id} />}
      {isRRPP && <DataCard events={events} />}
    </div>
  );
}
