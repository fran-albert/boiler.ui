"use client"
import { getAllEvents } from "@/api/Event/get-all-event";
import { useQuery } from "@tanstack/react-query"

interface Props {
    auth: boolean;
    fetchEvents: boolean;
}

export const useEvents = ({ auth, fetchEvents }: Props) => {

    const { isLoading, isError, error, data: events = [], isFetching } = useQuery({
        queryKey: ['events'],
        queryFn: () => getAllEvents(),
        staleTime: 1000 * 60,
        enabled: auth && fetchEvents
    });

    // const { isLoading: isLoadingLastPatients, isError: isErrorLastPatients, error: errorLastPatients, data: lastedpatients = 0 } = useQuery({
    //     queryKey: ["lastPatients"],
    //     queryFn: () => getLastPatients(),
    //     staleTime: 1000 * 60,
    //     enabled: auth
    // });

    // const { isLoading: isLoadingTotalPatients, isError: isErrorTotalPatients, error: errorTotalPatients, data: totalPatients = 0 } = useQuery({
    //     queryKey: ["totalPatients"],
    //     queryFn: () => getTotalPatients(),
    //     staleTime: 1000 * 60,
    //     enabled: auth
    // });

    // const nextPage = () => {
    //     if (patients?.length === 0) return;
    //     setPage((old) => old + 1);
    // };

    // const prevPage = () => {
    //     if (page === 1) return;
    //     setPage((old) => Math.max(old - 1, 1));
    // };


    return {
        events,
        error,
        isLoading,
        isError, isFetching,
        // isLoadingTotalPatients, isErrorTotalPatients, errorTotalPatients, totalPatients,
        // lastedpatients,
        // isLoadingLastPatients,
        // isErrorLastPatients,
        // errorLastPatients,
        // nextPage,
        // prevPage
    }

}