"use client"
import { getAllRrppByBossId } from "@/api/User/get-all-rrpp-by-boss-id";
import { getAllUsers } from "@/api/User/get-all-users";
import { useQuery } from "@tanstack/react-query"

interface Props {
    auth: boolean;
    fetchUsers: boolean;
    idBoss?: string;
}

export const useUsers = ({ auth, fetchUsers, idBoss }: Props) => {

    const { isLoading, isError, error, data: users = [], isFetching } = useQuery({
        queryKey: ['users'],
        queryFn: () => getAllUsers(),
        staleTime: 1000 * 60,
        enabled: auth && fetchUsers
    });


    const { isLoading: isLoadingRrppByBoss, isError: isErrorRrppByBoss, error: errorRrppByBoss, data: rrppByBoss = [], } = useQuery({
        queryKey: ['users', { idBoss }],
        queryFn: () => getAllRrppByBossId(String(idBoss)),
        staleTime: 1000 * 60,
        enabled: auth && fetchUsers
    });


    return {
        users,
        error,
        isLoading,
        isError, isFetching,
        rrppByBoss, isLoadingRrppByBoss, isErrorRrppByBoss, errorRrppByBoss,

    }

}