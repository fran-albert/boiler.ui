import { sleep } from "@/common/helpers/helpers";
import axiosInstance from "@/services/axiosConfig";
import { InstagramStory } from "@/types/Instagram-Story/Instagram-Story";

export const getStoriesForUserAndEvent = async (idUser: string, idEvent: string) => {
    await sleep(2);
    const { data } = await axiosInstance.get<InstagramStory[]>(`/instagram-stories/user/${idUser}/event/${idEvent}`);
    return data;
}
