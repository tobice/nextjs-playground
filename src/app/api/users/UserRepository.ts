import User from "@/app/common/users/User";

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

export function getUsers(): User[] {
    return users
}

export function addUser(user: User) {
    user.id = "00" + (users.length + 1)
    users.push(user)
}
