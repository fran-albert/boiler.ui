import React from "react";
import { Metadata } from "next";
import ClientEventsPage from "@/components/Client/Events";

export const metadata: Metadata = {
  title: "Eventos",
};

export default async function EventsPage() {
  return <ClientEventsPage />;
}
