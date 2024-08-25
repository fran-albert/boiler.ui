"use client";
import { ColumnDef } from "@tanstack/react-table";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDate, formatDni } from "@/common/helpers/helpers";
// import DeletePatientDialog from "../delete/DeletePatientDialog";
// import { Patient } from "@/types/Patient/Patient";
import Link from "next/link";
import { Event } from "@/types/Event/Event";
import { ViewButton } from "@/components/Button/View/button";
import DeleteUserDialog from "../Delete";
import { User } from "@/types/User/User";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { ViewButton } from "@/components/Button/View/button";

export const getColumns = (
  prefetchPatients: (id: number) => void,
  roles: { isRRPP: boolean; isRRPPBoss: boolean; isAdmin: boolean }
): ColumnDef<User>[] => {
  const columns: ColumnDef<User>[] = [
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
      header: "Usuario",
      cell: ({ row }) => (
        <Link
          href={`/usuarios/${row.original.id}`}
          className="flex items-center cursor-pointer"
          // onMouseEnter={() =>
          //   prefetchPatients && prefetchPatients(row.original.userId)
          // }
        >
          <Avatar>
            <AvatarImage
              src={
                row.original.photo
                  ? `https://incor-healthcare.s3.us-east-1.amazonaws.com/photos/${row.original.photo}`
                  : "https://incor-ranking.s3.us-east-1.amazonaws.com/storage/avatar/default.png"
              }
              alt="@username"
            />
            <AvatarFallback>
              {`${row.original.name.charAt(0)}${row.original.lastName.charAt(
                0
              )}`}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col ml-2">
            <p className="text-sm font-medium">
              {row.original.name} {row.original.lastName}
            </p>
            <span
              style={{ fontSize: "0.75rem" }}
              className="text-gray-800 font-bold"
            >
              {row.original.email}
            </span>
          </div>
        </Link>
      ),
    },
    {
      accessorKey: " ",
      header: "D.N.I.",
      cell: ({ row }) => (
        <div className="flex items-center">
          <p className="text-sm font-medium">
            {row.original.dni ? formatDni(row.original.dni) : "Sin DNI"}
          </p>
        </div>
      ),
    },
    {
      accessorKey: " ",
      header: "Rol",
      cell: ({ row }) => (
        <div className="flex items-center">
          <p className="text-sm font-medium">
            {row.original.roles.map((role) => role.name).join(", ")}
          </p>
        </div>
      ),
    },
    {
      accessorKey: "instagram",
      header: "Instagram",
      cell: ({ row }) => (
        <div className="flex items-center">
          <p className="text-sm font-medium">{row.original.instagram}</p>
        </div>
      ),
    },
    {
      header: " ",
      cell: ({ row }) => (
        <div className="flex items-center justify-end">
          <ViewButton
            slug={String(row.original.id)}
            text="Ver Usuario"
            path="usuarios"
          />
          <DeleteUserDialog idEvent={String(row.original.id)} />
          {/* {(roles.isSecretary || roles.isDoctor) && ( */}
          {/* )} */}
          {/* {roles.isSecretary && ( */}
          {/* )} */}
        </div>
      ),
    },
  ];

  return columns;
};
