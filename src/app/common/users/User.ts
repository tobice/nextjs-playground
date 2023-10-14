export default interface User {
    id?: string;
    email: string;
    firstName: string;
    lastName: string;
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
