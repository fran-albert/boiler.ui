import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { eventSchema } from "@/validators/event.schema";
import { useEventMutations } from "@/hooks/Event/useEventMutation";

interface CreateEventDialogProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CreateEventDialog({
  isOpen,
  setIsOpen,
}: CreateEventDialogProps) {
  const form = useForm<z.infer<typeof eventSchema>>({
    resolver: zodResolver(eventSchema),
  });
  const {
    reset,
    formState: { errors },
  } = form;
  const { createEventMutation } = useEventMutations();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const toggleDialog = () => {
    setIsOpen(!isOpen);
    reset();
    if (!isOpen) {
      form.reset();
    }
  };
  async function onSubmit(values: z.infer<typeof eventSchema>) {
    console.log("Valores enviados:", values);
    try {
      const promise = createEventMutation.mutateAsync(values);
      toast.promise(promise, {
        loading: "Creando Evento...",
        success: "Evento creado con éxito!",
        error: "Error al crear el Evento",
      });

      promise
        .then((data) => {
          setIsOpen(false);
          reset();
        })
        .catch((error) => {
          console.error("Error al crear el Evento", error);
        });
    } catch (error) {
      console.error("Error al crear el Evento", error);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={toggleDialog}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Crear Nuevo Evento</DialogTitle>
          <DialogDescription>
            Ingrese el nombre y fecha del evento.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black">Nombre</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Ingrese el nombre del evento..."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black">
                        Fecha del Evento
                      </FormLabel>
                      <FormControl>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-start font-normal"
                            >
                              <CalendarDaysIcon className="mr-2 h-4 w-4" />
                              {date
                                ? date.toLocaleDateString()
                                : "Seleccione una fecha"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={date}
                              onSelect={(selectedDate) => {
                                setDate(selectedDate);
                                // Convertir la fecha a string y actualizar el campo del formulario
                                field.onChange(
                                  selectedDate?.toISOString().split("T")[0]
                                );
                              }}
                              className="rounded-md border"
                            />
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Crear Evento</Button>
              <Button variant="outline" type="button" onClick={toggleDialog}>
                Cerrar
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

function CalendarDaysIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
      <path d="M8 18h.01" />
      <path d="M12 18h.01" />
      <path d="M16 18h.01" />
    </svg>
  );
}
