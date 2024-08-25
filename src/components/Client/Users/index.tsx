"use client";
import Loading from "@/app/loading";
import { EventsTable } from "@/components/Events/Table/table";
import { UsersTable } from "@/components/Users/Table/table";
import { useEvents } from "@/hooks/Event/useEvents";
import { useUsers } from "@/hooks/User/useUsers";
import React from "react";

const ClientUsersPage = () => {
  const { users, isLoading, error } = useUsers({
    auth: true,
    fetchUsers: true
  });

  if (isLoading) {
    return <Loading isLoading={true} />;
  }

  return (
    <>
      {isLoading ? (
        <Loading isLoading={true} />
      ) : (
        <UsersTable
          users={users || []}
          prefetchPatients={() => console.log("prefetchPatients")}
          isLoading={isLoading}
        />
      )}
    </>
  );
};

export default ClientUsersPage;
