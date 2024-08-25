"use client";
import Loading from "@/app/loading";
import EventCardComponent from "@/components/Events/Card";
import { useEvent } from "@/hooks/Event/useEvent";
import { useInstagramStories } from "@/hooks/Instagram-Story/useInstagramStories";
import useRoles from "@/hooks/Roles/useRoles";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import React from "react";

const EventIdPage = () => {
  const params = useParams();
  const id = params.id as string;
  const { event, isLoading, error } = useEvent({ auth: true, id });
  const { isAdmin, isRRPPBoss, isRRPP } = useRoles();
  const fetchRRPPForEvent = isRRPPBoss;
  const fetchInstagramStories = isRRPP;
  const { data: session } = useSession();

  const {
    data,
    isLoading: isLoadingIS,
    isLoadingInstagramStories,
    instagramStories,
  } = useInstagramStories({
    auth: true,
    fetchInstagramStories: fetchInstagramStories, // Solicitar historias solo si es RRPP
    fetchRRPPForEvent: fetchRRPPForEvent, // Solicitar RRPP solo si es Jefe de Publicas
    idBoss: isRRPPBoss ? String(session?.user.id) : undefined,
    idEvent: id,
    idRRPP: isRRPP ? String(session?.user.id) : undefined,
  });

  return (
    <>
      {error && <div>Hubo un error al cargar los pacientes.</div>}
      {isLoading || isLoadingIS || isLoadingInstagramStories ? (
        <Loading isLoading={true} />
      ) : (
        <div className="container flex items-center justify-center mt-10">
          {event && (
            <EventCardComponent
              event={event}
              rrpp={data}
              instragramStories={instagramStories}
            />
          )}
        </div>
      )}
    </>
  );
};

export default EventIdPage;
