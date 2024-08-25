import { sleep } from "@/common/helpers/helpers";
import axiosInstance from "@/services/axiosConfig";
import { User } from "@/types/User/User";

export const getAllUsers = async (): Promise<User[]> => {
    // await sleep(2);
    const { data } = await axiosInstance.get<User[]>(`users`)
    return data;
}
