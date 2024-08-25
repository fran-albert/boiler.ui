import { ViewButton } from "@/components/Button/View/button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useUsers } from "@/hooks/User/useUsers";
import Link from "next/link";
import React, { useState } from "react";

interface Props {
  id: string;
}

const RrppTable = ({ id }: Props) => {
  const { errorRrppByBoss, isLoadingRrppByBoss, rrppByBoss } = useUsers({
    auth: true,
    fetchUsers: true,
    idBoss: id,
  });

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredPublicas = rrppByBoss.filter((user) =>
    `${user.name} ${user.lastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      <div className="mt-5 flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Mis Públicas</h2>
        <div className="flex items-center">
          <Input
            type="search"
            placeholder="Buscar públicas.."
            value={searchTerm}
            onChange={handleSearchChange}
            className="mr-2"
          />
          <Button className="bg-cyan-950 hover:bg-cyan-800">
            Agregar Nuevo
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <ScrollArea className="h-96">
          <Table>
            <TableHeader className="sticky top-0 bg-white z-10 border-b">
              <TableRow>
                <TableHead className="whitespace-nowrap w-10">#</TableHead>
                <TableHead className="whitespace-nowrap w-32">
                  Pública
                </TableHead>
                <TableHead className="whitespace-nowrap w-32">
                  Instagram
                </TableHead>
                <TableHead className="whitespace-nowrap w-32">
                  Acciones
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPublicas.map((user, index) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium w-10">
                    {index + 1}
                  </TableCell>
                  <TableCell className="w-32">
                    {user.name} {user.lastName}
                  </TableCell>
                  <TableCell className="w-32">
                    <Link
                      href={`https://www.instagram.com/${user.instagram}`}
                      className="text-blue-600"
                    >
                      @{user.instagram}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <div className="flex">
                      <ViewButton
                        slug={String(user.id)}
                        text="Ver Pública"
                        path="usuarios"
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>
    </div>
  );
};

export default RrppTable;
