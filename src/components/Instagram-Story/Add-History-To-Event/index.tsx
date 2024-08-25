"use client";

import React, { use, useState } from "react";
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
import { FaCalendar, FaCamera, FaFilePdf, FaUpload } from "react-icons/fa";
import axios from "axios";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { es } from "date-fns/locale/es";
import moment from "moment-timezone";
import { SubmitHandler, useForm } from "react-hook-form";
import { InstagramStory } from "@/types/Instagram-Story/Instagram-Story";
import { useSession } from "next-auth/react";
import { useInstagramStoriesMutations } from "@/hooks/Instagram-Story/useInstagramStoriesMutation";
interface AddHistoryToEventDialogProps {
  idEvent: string;
}

export default function AddHistoryToEventDialog({
  idEvent,
}: AddHistoryToEventDialogProps) {
  const { data: session } = useSession();
  const idUser = session?.user.id;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleDialog = () => setIsOpen(!isOpen);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();
  const { createInstagramStoryMutation } = useInstagramStoriesMutations();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const onSubmit: SubmitHandler<any> = async (data) => {
    const payload: any = {
      name: data.name,
      idEvent: idEvent,
      idUser: idUser,
    };
    console.log(payload);
    // const formData = new FormData();
    // formData.append("StudyTypeId", data.StudyTypeId);
    // if (idUser) {
    //   formData.append("UserId", String(idUser));
    // }
    // if (selectedFile) {
    //   formData.append("StudyFile", selectedFile);
    // }
    // formData.append("Date", formattedDateISO);
    // formData.append("Note", data.Note);
    try {
      toast.promise(createInstagramStoryMutation.mutateAsync(payload), {
        loading: "Publicando Historia...",
        success: "Historia publicada con éxito!",
        error: "Error al publicar la historia",
      });
    } catch (error) {
      console.error("Error al publicar la historia", error);
      toast.error("Error al publicar la historia");
    } finally {
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={toggleDialog}
          className="flex items-center justify-center bg-green-500 text-white font-bold hover:bg-green-600"
        >
          Nueva Historia
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-w-[300px] border border-gray-300 rounded-lg p-4">
        <DialogHeader>
          <DialogTitle>Agregar Nueva Historia</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label
                htmlFor="studyType"
                className="block text-black font-medium mb-2"
              >
                Nombre
              </Label>
              <Input {...register("name", { required: true })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="file">Comprobante</Label>
              <Input
                type="file"
                className="text-black"
                onChange={(e) =>
                  setSelectedFile(e.target.files && e.target.files[0])
                }
              />
            </div>
          </div>
          <DialogFooter className="flex flex-col sm:flex-row sm:justify-end">
            <Button
              variant="outline"
              type="button"
              onClick={toggleDialog}
              className="w-full sm:w-auto mb-2 sm:mb-0"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="default"
              className="w-full sm:w-auto"
              disabled={createInstagramStoryMutation.isPending}
            >
              {createInstagramStoryMutation.isPending
                ? "Publicando..."
                : "Publicar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
