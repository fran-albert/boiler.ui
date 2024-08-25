import { Button } from "@/components/ui/button";
import { useEventMutations } from "@/hooks/Event/useEventMutation";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface Props {
  idEvent: string;
}

const AddHistoryToEvent = ({ idEvent }: Props) => {
  const { addHistoryMutation } = useEventMutations();
  async function onSubmit() {
    try {
      const promise = addHistoryMutation.mutateAsync({
        id: idEvent,
      });
      toast.promise(promise, {
        loading: "Agregando una historia...",
        success: "Historia agregada con éxito!",
        error: "Error al agregar la historia",
      });

      promise.catch((error) => {
        console.error("Error al agregar la historia", error);
      });
    } catch (error) {
      console.error("Error al agregar la historia", error);
    }
  }

  return (
    <div>
      <Button
        variant="secondary"
        className="w-full"
        onClick={onSubmit}
        disabled={addHistoryMutation.isPending}
      >
        {addHistoryMutation.isPending
          ? "Agregando historia..."
          : "Agregar Historia"}
      </Button>
    </div>
  );
};

export default AddHistoryToEvent;
