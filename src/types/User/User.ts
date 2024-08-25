import { Gender } from "@/common/enums/gender.enum";
import { InstagramStory } from "../Instagram-Story/Instagram-Story";

export interface User {
    id: string;
    name: string;
    lastName: string;
    email: string;
    password: string;
    dni: string;
    gender: Gender;
    phone: string;
    photo: string;
    instagram: string;
    publicBoss?: User;
    rrpp: User[];
    roles: any[];
    instagramStories: InstagramStory[];
}