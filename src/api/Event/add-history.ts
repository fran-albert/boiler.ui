import { sleep } from "@/common/helpers/helpers";
import axiosInstance from "@/services/axiosConfig";
import { Event } from "@/types/Event/Event";

export const addHistory = async (idEvent: string) => {
    await sleep(2);
    const { data } = await axiosInstance.post<Event>(`/event/updateCount/${idEvent}`);
    return data;
}
