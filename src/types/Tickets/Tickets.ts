import { Event } from "../Event/Event";
import { User } from "../User/User";

export interface Tickets {
    id: string;
    user: User[];
    event: Event[];
}