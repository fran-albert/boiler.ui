import { Event } from "../Event/Event";
import { User } from "../User/User";

export interface InstagramStory {
    id: string;
    name: string;
    date: string | Date;
    event: Event[]
    user: User[]
}