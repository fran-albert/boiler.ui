import { sleep } from "@/common/helpers/helpers";
import axiosInstance from "@/services/axiosConfig";
import { User } from "@/types/User/User";

export const getUserById = async (id: string): Promise<User> => {
    await sleep(2);
    const { data } = await axiosInstance.get<User>(`users/${id}`)
    return data;
}
