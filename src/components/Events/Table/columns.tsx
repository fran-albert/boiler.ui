"use client";
import { ColumnDef } from "@tanstack/react-table";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDate, formatDni } from "@/common/helpers/helpers";
// import DeletePatientDialog from "../delete/DeletePatientDialog";
// import { Patient } from "@/types/Patient/Patient";
import Link from "next/link";
import { Event } from "@/types/Event/Event";
import { ViewButton } from "@/components/Button/View/button";
import DeleteEventDialog from "../Delete";
import { Button } from "@/components/ui/button";
import AddHistoryToEventDialog from "@/components/Instagram-Story/Add-History-To-Event";
// import { ViewButton } from "@/components/Button/View/button";

export const getColumns = (roles: {
  isRRPP: boolean;
  isRRPPBoss: boolean;
  isAdmin: boolean;
}): ColumnDef<Event>[] => {
  const columns: ColumnDef<Event>[] = [
    {
      accessorKey: "#",
      header: "#",
      cell: ({ row }) => {
        const index = row.index;
        return <div className="text-sm">{index + 1}</div>;
      },
    },
    {
      accessorKey: "firstName",
      header: "Evento",
      cell: ({ row }) => {
        const eventName = (
          <div className="flex flex-col ml-2">
            <p className="text-sm font-medium">{row.original.name}</p>
          </div>
        );
        return (
          <Link
            href={`/eventos/${row.original.id}`}
            className="flex items-center cursor-pointer"
          >
            {eventName}
          </Link>
        );
      },
    },
    {
      accessorKey: " ",
      header: "Fecha",
      cell: ({ row }) => (
        <div className="flex items-center">
          <p className="text-sm font-medium">
            {formatDate(String(row.original.date))}
          </p>
        </div>
      ),
    },
    {
      accessorKey: "dni",
      header: "Historias a publicar",
      cell: ({ row }) => (
        <div className="flex items-center">
          <p className="text-sm font-medium">
            {row.original.expectedStoryCountPerUser}
          </p>
        </div>
      ),
    },
    {
      header: " ",
      cell: ({ row }) => (
        <div className="flex items-center justify-end">
          {/* {roles.isRRPP && (
            <AddHistoryToEventDialog idEvent={String(row.original.id)} />
          )} */}
          <ViewButton
            slug={String(row.original.id)}
            text="Ver Evento"
            path="eventos"
          />
          {roles.isRRPPBoss && (
            <>
              <DeleteEventDialog idEvent={String(row.original.id)} />
            </>
          )}
        </div>
      ),
    },
  ];

  return columns;
};
