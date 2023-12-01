import {z} from 'zod'

export const createTaskSchema = z.object({
    collectionId: z.number().nonnegative(),
    content: z.string().min(3, {
        message: "Die Aufgabe muss mindestens 3 Buchstaben lang sein"
    }),
    expiresAt: z.date().optional()
})

export type createTaskSchemaType = z.infer<typeof createTaskSchema>