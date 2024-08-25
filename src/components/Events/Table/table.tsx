import { DataTable } from "@/components/Table/table";
import { Event } from "@/types/Event/Event";
import { getColumns } from "./columns";
import CreateEventDialog from "../Create";
import { useState } from "react";
import useRoles from "@/hooks/Roles/useRoles";

interface EventsPageProps {
  events: Event[];
  isLoading?: boolean;
}

export const EventsTable: React.FC<EventsPageProps> = ({
  events,
  isLoading,
}) => {
  const [isCreateEventDialogOpen, setIsCreateEventDialogOpen] = useState(false);
  const openCreateEventDialog = () => setIsCreateEventDialogOpen(true);
  const { isRRPP, isRRPPBoss, isAdmin } = useRoles();

  const eventsColumns = getColumns({
    isRRPP,
    isRRPPBoss,
    isAdmin,
  });

  const customFilterFunction = (event: Event, query: string) =>
    event.name.toLowerCase().includes(query.toLowerCase());

  return (
    <div className="container">
      <h2 className="text-2xl font-semibold text-center mt-6">
        Lista de Eventos
      </h2>
      <div className="overflow-hidden sm:rounded-lg p-4 ">
        <DataTable
          columns={eventsColumns}
          data={events}
          searchPlaceholder="Buscar eventos..."
          showSearch={true}
          onAddClick={openCreateEventDialog}
          customFilter={customFilterFunction}
          addLinkText="Crear Evento"
          isLoading={isLoading}
          canAddUser={true}
        />
      </div>
      <CreateEventDialog
        isOpen={isCreateEventDialogOpen}
        setIsOpen={setIsCreateEventDialogOpen}
      />
    </div>
  );
};
