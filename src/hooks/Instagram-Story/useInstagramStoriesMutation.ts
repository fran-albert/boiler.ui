import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createInstagramStory } from "@/api/Instagram-Story/create-instragram-story";

export const useInstagramStoriesMutations = () => {
    const queryClient = useQueryClient();

    const createInstagramStoryMutation = useMutation({
        mutationFn: createInstagramStory,
        onSuccess: (event, variables, context) => {
            queryClient.invalidateQueries({ queryKey: ['instagramStories'] });
            console.log("Event created", event, variables, context);
        },

        onError: (error, variables, context) => {
            console.log("Error creating events", error, variables, context);
        },
    });

    return { createInstagramStoryMutation };
};
