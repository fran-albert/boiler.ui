import { sleep } from "@/common/helpers/helpers";
import axiosInstance from "@/services/axiosConfig";
import { InstagramStory } from "@/types/Instagram-Story/Instagram-Story";

export const createInstagramStory = async (instagramStory: InstagramStory) => {
    await sleep(2);
    const { data } = await axiosInstance.post<InstagramStory>(`/instagram-stories`, instagramStory);
    return data;
}
