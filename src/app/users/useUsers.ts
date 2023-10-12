import User from "../common/users/User";
import useSWR from "swr";

const API_SERVER = "http://localhost:3000"

type UseTodosReturn = {
    users: User[],
    addUser: (user: User) => Promise<void>
}

export default function useUsers(): UseTodosReturn {
    const fetcher = (...args) => fetch(...args).then(res => res.json())
    const { data: users, mutate } = useSWR(API_SERVER + "/api/users", fetcher)

    async function addUser(user: User) {
        await fetch(API_SERVER + "/api/users",
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json',},
                body: JSON.stringify(user),
            })
        await mutate()
    }

    return { users, addUser }
}
