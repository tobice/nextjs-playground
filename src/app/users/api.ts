import User from "../common/users/User";

export async function getUsers(): Promise<User[]> {
    const res = await fetch("http://localhost:3000/api/users")
    return res.json()
}

export async function addUser(user: User) {
    await fetch("http://localhost:3000/api/users",
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
}
