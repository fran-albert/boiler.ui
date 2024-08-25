import React from "react";
import { Metadata } from "next";
import ClientUsersPage from "@/components/Client/Users";

export const metadata: Metadata = {
  title: "Usuarios",
};

export default async function UsersPage() {
  return <ClientUsersPage />;
}
