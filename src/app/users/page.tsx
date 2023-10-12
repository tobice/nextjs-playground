'use client'

import useUsers from "@/app/users/useUsers";
import UserForm from "@/app/users/UserForm";

export default function Home() {
    const { users, addUser } = useUsers()

    return <>
        <UserForm onSubmit={addUser}/>
        {users && users.map(user => <div key={user.id}>{user.firstName} {user.lastName}</div>)}
    </>
}