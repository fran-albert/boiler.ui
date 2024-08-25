"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaRegTrashAlt, FaEye } from "react-icons/fa";
import { toast } from "sonner";
import ActionIcon from "@/components/Icons/action";
import { useEventMutations } from "@/hooks/Event/useEventMutation";
// import { usePatientMutations } from "@/hooks/Patient/usePatientMutation";
// import { usePatients } from "@/hooks/Patient/usePatients";
// import { usePatientStore } from "@/stores/Patient/patient.store";

interface DeleteUserDialogProps {
  idEvent: string;
}

export default function DeleteUserDialog({ idEvent }: DeleteUserDialogProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleDialog = () => setIsOpen(!isOpen);
  const { deleteEventMutation } = useEventMutations();

  const handleConfirmDelete = async () => {
    const deletePromise = deleteEventMutation.mutateAsync(idEvent);

    toast.promise(deletePromise, {
      loading: "Eliminando evento...",
      success: "Evento eliminado con éxito!",
      error: (err) => {
        console.error("Error al eliminar el Evento", err);
        return "Error al eliminar el Evento";
      },
    });

    try {
      await deletePromise;
    } catch (error) {
      console.error("Error al eliminar el Evento", error);
    } finally {
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" onClick={toggleDialog}>
          <ActionIcon
            tooltip="Eliminar Usuario"
            icon={<FaRegTrashAlt className="w-4 h-4" color="red" />}
          />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Eliminar Evento</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          ¿Estás seguro de que quieres eliminar este Evento?
        </DialogDescription>
        <DialogFooter>
          <Button variant="outline" onClick={toggleDialog}>
            Cancelar
          </Button>
          <Button
            variant="default"
            onClick={handleConfirmDelete}
            disabled={deleteEventMutation.isPending}
          >
            {deleteEventMutation.isPending ? "Eliminando..." : "Eliminar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
