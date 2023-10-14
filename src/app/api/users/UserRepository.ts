import User, {UserOrderBy} from "@/app/common/users/User";
import {sort} from "next/dist/build/webpack/loaders/css-loader/src/utils";

const users: User[] = [
    {
        id: '001',
        email: 'john.doe@email.com',
        firstName: 'John',
        lastName: 'Doe'
    },
    {
        id: '002',
        email: 'jane.smith@email.com',
        firstName: 'Jane',
        lastName: 'Smith'
    },
    {
        id: '003',
        email: 'mike.jones@email.com',
        firstName: 'Mike',
        lastName: 'Jones'
    },
    {
        id: '004',
        email: 'susan.lee@email.com',
        firstName: 'Susan',
        lastName: 'Lee'
    },
    {
        id: '005',
        email: 'robert.brown@email.com',
        firstName: 'Robert',
        lastName: 'Brown'
    }
];

export function getUsers(orderBy: UserOrderBy | null, search: string | null): User[] {
    let sortedUsers = [...users]

    function compareStrings(string1?: String, string2?: String): number {
        if (string1 < string2) {
            return -1
        }

        if (string1 > string2) {
            return 1;
        }

        return 0
    }

    function compare(user1: User, user2: User): number {
        switch (orderBy) {
            case UserOrderBy.FirstName: return compareStrings(user1.firstName, user2.firstName)
            case UserOrderBy.LastName: return compareStrings(user1.lastName, user2.lastName)
            default: return compareStrings(user1.id, user2.id)
        }
    }

    if (orderBy != null) {
        sortedUsers.sort(compare)
    }

    if (search != null) {
        const needle = search.toLowerCase()
        sortedUsers = sortedUsers.filter(user =>
            user.firstName.toLowerCase().includes(needle) ||
            user.lastName.toLowerCase().includes(needle)
        )
    }

    return sortedUsers
}

export function addUser(user: User) {
    user.id = "00" + (users.length + 1)
    users.push(user)
}
