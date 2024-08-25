import { sleep } from "@/common/helpers/helpers";
import axiosInstance from "@/services/axiosConfig";
import { Event } from "@/types/Event/Event";

export const getEventById = async (id: string) => {
    await sleep(2);
    const { data } = await axiosInstance.get<Event>(`/event/${id}`);
    return data;
}
