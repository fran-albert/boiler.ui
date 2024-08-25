import { InstagramStory } from "../Instagram-Story/Instagram-Story";
import { Tickets } from "../Tickets/Tickets";

export interface Event {
    id?: string;
    name: string;
    date: string | Date;
    expectedStoryCountPerUser?: number;
    instagramStories?: InstagramStory[];
    ticketsFree?: Tickets[];
}