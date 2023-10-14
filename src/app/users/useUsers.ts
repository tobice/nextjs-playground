import User, {UserOrderBy} from "../common/users/User";
import useSWR from "swr";

const API_SERVER = "http://localhost:3000"

type UseUsersReturn = {
    users: User[] | null,
    addUser: (user: User) => Promise<void>
}

export default function useUsers(
    orderBy: UserOrderBy | null,
    search: string | null
): UseUsersReturn {
    const url = new URL(API_SERVER + "/api/users");

    if (orderBy) {
        url.searchParams.append("orderBy", orderBy)
    }

    if (search) {
        url.searchParams.append("search", search)
    }

    const fetcher = (input: RequestInfo, init?: RequestInit) =>
        fetch(input, init).then(res => res.json())
    const { data: users, mutate } = useSWR(url.href, fetcher)

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
