import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEvent } from "@/api/Event/create-event";
import { deleteEvent } from "@/api/Event/delete-event";
import { addHistory } from "@/api/Event/add-history";

export const useEventMutations = () => {
    const queryClient = useQueryClient();

    const createEventMutation = useMutation({
        mutationFn: createEvent,
        onSuccess: (event, variables, context) => {
            queryClient.invalidateQueries({ queryKey: ['events'] });
            console.log("Event created", event, variables, context);
        },

        onError: (error, variables, context) => {
            console.log("Error creating events", error, variables, context);
        },
    });

    //   const updatePatientMutation = useMutation({
    //     mutationFn: ({ id, patient }: { id: number; patient: Patient }) => updatePatient(id, patient),
    //     onSuccess: (patient, variables, context) => {
    //       queryClient.invalidateQueries({ queryKey: ['patient', variables.id] });
    //       console.log("Patient updated", patient, variables, context);
    //     },
    //     onError: (error, variables, context) => {
    //       console.log("Error updating patient", error, variables, context);
    //     },
    //   });


    const addHistoryMutation = useMutation({
        mutationFn: ({ id }: { id: string }) => addHistory(id),
        onSuccess: (event, variables, context) => {
            queryClient.invalidateQueries({ queryKey: ['event', variables.id] });
            console.log("event updated", event, variables, context);
        },
        onError: (error, variables, context) => {
            console.log("Error updating event", error, variables, context);
        },
    });

    const deleteEventMutation = useMutation({
        mutationFn: (id: string) => deleteEvent(id),
        onSuccess: (event, variables, context) => {
            queryClient.invalidateQueries({ queryKey: ['events'] })
            console.log("event deleted", event, variables, context);
        },
        onError: (error, variables, context) => {
            console.log("Error deleting event", error, variables, context);
        },
    });

    return { createEventMutation, deleteEventMutation, addHistoryMutation };
};
