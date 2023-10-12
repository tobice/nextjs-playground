import User from "../common/users/User";

const API_SERVER = "http://localhost:3000"

export const USERS_KEY = "users"

export async function getUsers(): Promise<User[]> {
    const res = await fetch(API_SERVER + "/api/users")
    return res.json()
}

export async function addUser(user: User) {
    await fetch(API_SERVER + "/api/users",
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify(user),
        })
}
