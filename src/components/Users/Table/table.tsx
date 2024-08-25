// import useRoles from "@/hooks/useRoles";
import { DataTable } from "@/components/Table/table";
import { Event } from "@/types/Event/Event";
import { getColumns } from "./columns";
import { useState } from "react";
import { User } from "@/types/User/User";
import useRoles from "@/hooks/Roles/useRoles";

interface UsersPageProps {
  users: User[];
  prefetchPatients: (id: number) => void;
  isLoading?: boolean;
}

export const UsersTable: React.FC<UsersPageProps> = ({
  users,
  isLoading,
  prefetchPatients,
}) => {
  const [isCreateEventDialogOpen, setIsCreateEventDialogOpen] = useState(false);
  const openCreateEventDialog = () => setIsCreateEventDialogOpen(true);
  const { isRRPP, isRRPPBoss, isAdmin } = useRoles();
  console.log(users)
  const usersColumns = getColumns(prefetchPatients, {
    isRRPP,
    isRRPPBoss,
    isAdmin,
  });
  const customFilterFunction = (event: User, query: string) =>
    event.name.toLowerCase().includes(query.toLowerCase());

  return (
    <div className="container">
      <h2 className="text-2xl font-semibold text-center mt-6">
        Lista de Usuarios
      </h2>
      <div className="overflow-hidden sm:rounded-lg p-4 ">
        <DataTable
          columns={usersColumns}
          data={users}
          searchPlaceholder="Buscar usuarios..."
          showSearch={true}
          onAddClick={openCreateEventDialog}
          customFilter={customFilterFunction}
          addLinkText="Crear Usuario"
          isLoading={isLoading}
          canAddUser={true}
        />
      </div>
      {/* <CreateEventDialog
        isOpen={isCreateEventDialogOpen}
        setIsOpen={setIsCreateEventDialogOpen}
      /> */}
    </div>
  );
};
