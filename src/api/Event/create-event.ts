import { sleep } from "@/common/helpers/helpers";
import axiosInstance from "@/services/axiosConfig";
import { Event } from "@/types/Event/Event";

export const createEvent = async (event: Event) => {
    await sleep(2);
    const { data } = await axiosInstance.post<Event>(`/event`, event);
    return data;
}
