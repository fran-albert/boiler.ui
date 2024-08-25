"use client";
import Loading from "@/app/loading";
import DataCard from "@/components/Events/ListCard";
import { EventsTable } from "@/components/Events/Table/table";
import { useEvents } from "@/hooks/Event/useEvents";
import { useSession } from "next-auth/react";
import React from "react";

const ClientEventsPage = () => {
  const { events, isLoading, error } = useEvents({
    auth: true,
    fetchEvents: true,
  });

  if (isLoading) {
    return <Loading isLoading={true} />;
  }

  return (
    <>
      {isLoading ? <Loading isLoading={true} /> : <DataCard events={events} />}
    </>
  );
};

export default ClientEventsPage;
