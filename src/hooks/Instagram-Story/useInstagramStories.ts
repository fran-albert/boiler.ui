"use client"
import { getStoriesForUserAndEvent } from "@/api/Instagram-Story/get-instragram-stories-by-event-rrpp";
import { getRrrpForEventByBoss } from "@/api/Instagram-Story/get-rrpp-for-event-by-boss";
import { useQuery } from "@tanstack/react-query"

interface Props {
    auth: boolean;
    fetchInstagramStories: boolean;
    fetchRRPPForEvent: boolean;
    idBoss?: string;
    idRRPP?: string;
    idEvent?: string;
}

export const useInstagramStories = ({ auth, fetchInstagramStories, fetchRRPPForEvent, idBoss, idEvent, idRRPP }: Props) => {

    const { isLoading, isError, error, data = [], isFetching } = useQuery({
        queryKey: ['instagramStories', { idBoss, idEvent }],
        queryFn: () => getRrrpForEventByBoss(String(idBoss), String(idEvent)),
        staleTime: 1000 * 60,
        enabled: auth && fetchRRPPForEvent
    });

    const { isLoading: isLoadingInstagramStories, isError: isErrorInstagramStories, error: errorInstagramStories, data: instagramStories = [] } = useQuery({
        queryKey: ['instagramStories', { idRRPP, idEvent }],
        queryFn: () => getStoriesForUserAndEvent(String(idRRPP), String(idEvent)),
        staleTime: 1000 * 60,
        enabled: auth && fetchInstagramStories
    });


    return {
        data,
        error,
        isLoading,
        isError, isFetching,
        isLoadingInstagramStories, isErrorInstagramStories, errorInstagramStories, instagramStories,
    }

}