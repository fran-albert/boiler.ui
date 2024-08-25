import { getEventById } from "@/api/Event/get-event";
import { useQuery } from "@tanstack/react-query"

interface Props {
    auth: boolean;
    id: string
}

export const useEvent = ({ auth, id }: Props) => {

    const { isLoading, isError, error, data: event, isFetching } = useQuery({
        queryKey: ['event', id],
        queryFn: () => getEventById(id),
        staleTime: 1000 * 60,
        enabled: auth && id !== undefined,
    });


    return {
        event,
        error,
        isLoading,
        isError, isFetching,
    }

}