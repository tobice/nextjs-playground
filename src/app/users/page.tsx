'use client'

import User from "@/app/common/users/User";
import {getUsers, addUser, USERS_KEY} from "@/app/users/api";
import useSWR from "swr";
import UserForm from "@/app/users/UserForm";

export default function Home() {
    const { data: users, mutate } = useSWR(USERS_KEY, getUsers)

    async function handleAddUser(user) {
        await addUser(user)
        await mutate()
    }

    return <>
        <UserForm onSubmit={handleAddUser}/>
        {users && users.map(user => <div key={user.id}>{user.firstName} {user.lastName}</div>)}
    </>
}