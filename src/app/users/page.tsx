'use client'

import User from "@/app/common/users/User";
import {getUsers, addUser, USERS_KEY} from "@/app/users/api";
import useSWR from "swr";

export default function Home() {
    const { data: users, mutate } = useSWR(USERS_KEY, getUsers)

    const user: User = {
        id: "",
        email: "tobiaspotocek@gmail.com",
        firstName: "Tobias",
        lastName: "Potocek",
    }

    async function handleAddUser() {
        await addUser(user)
        await mutate()
    }

    return <div>
        <button onClick={() => handleAddUser()}>Add user</button>
        {users && users.map(user => <div key={user.id}>{user.firstName} {user.lastName}</div>)}
    </div>
}