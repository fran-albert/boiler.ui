import { sleep } from "@/common/helpers/helpers";
import axiosInstance from "@/services/axiosConfig";
import { Event } from "@/types/Event/Event";

export const getAllEvents = async (): Promise<Event[]> => {
    // await sleep(2);
    const { data } = await axiosInstance.get<Event[]>(`event`)
    return data;
}
