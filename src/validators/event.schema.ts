import { z } from 'zod';

export const eventSchema = z.object({
    // id: z.string(),
    name: z.string({
        required_error: 'El nombre es requerido',
    }),
    date: z.string({
        required_error: 'La fecha es requerida',
    }),
    // expectedStoryCountPerUser: z.number(),
});
