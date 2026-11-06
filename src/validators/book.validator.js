import {z} from 'zod';

export const createBookSchema = z.object({
    title: z.string({required_error: 'el titulo es obligatorio'}).min(1, 'El titulo no puede estar vacio'),
    author: z.string({required_error: 'el autor es obligatorio'}).min(1, 'El autor no puede estar vacio'),
    publishedYear:z.number().int().optional(),
    genre: z.string().optional(),
    available: z.boolean().optional()
});

export const updateBookSchema = createBookSchema.partial();

export const validateBook = (data) => createBookSchema.safeParse(data);
export const validatePartialBook = (data) => updateBookSchema.safeParse(data);
