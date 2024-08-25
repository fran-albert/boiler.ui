import { sleep } from "@/common/helpers/helpers";
import axiosInstance from "@/services/axiosConfig";
import { Event } from "@/types/Event/Event";

export const deleteEvent = async (id: string) => {
    await sleep(2);
    const { data } = await axiosInstance.delete<Event>(`/event/${id}`);
    return data;
}
