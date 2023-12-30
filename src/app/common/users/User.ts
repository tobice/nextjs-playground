import {z, ZodError} from "zod"

export const UserSchema = z.object({
    id: z.string().optional(),
    email: z.string().email().min(1, "Email cannot be empty."),
    firstName: z.string().min(1, "First name cannot be empty."),
    lastName: z.string().min(1, "Last name cannot be empty."),
});

type User = z.infer<typeof UserSchema>;

export default User

export function parseUser(data: any): {
    user: User | null,
    error: ZodError | null
} {
    const validationResult = UserSchema.safeParse(data)

    if (validationResult.success) {
        return {
            user: validationResult.data,
            error: null
        }
    } else {
        return {
            user: null,
            error: validationResult.error
        }
    }
}

export function parseUserOrderBy(orderBy: any): UserOrderBy | null {
    switch (orderBy) {
        case "firstName": return UserOrderBy.FirstName
        case "lastName": return UserOrderBy.LastName
        default: return null
    }
}

export enum UserOrderBy {
    FirstName = "firstName",
    LastName = "lastName",
}
