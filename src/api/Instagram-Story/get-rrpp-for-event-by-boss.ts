import { sleep } from "@/common/helpers/helpers";
import axiosInstance from "@/services/axiosConfig";
import { User } from "@/types/User/User";

export const getRrrpForEventByBoss = async (idBoss: string, idEvent: string) => {
    await sleep(2);
    const { data } = await axiosInstance.get<any[]>(`/instagram-stories/totalStories/${idEvent}/boss/${idBoss}`);
    return data;
}
