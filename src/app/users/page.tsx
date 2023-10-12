'use client'

import User from "@/app/common/users/User";
import {useEffect, useState} from "react";
import {getUsers, addUser} from "@/app/users/api";


export default function Home() {
    const [users, setUsers] = useState([])

    useEffect(() => {
        getUsers().then(setUsers)
    }, [])

    const user: User = {
        id: "",
        email: "tobiaspotocek@gmail.com",
        firstName: "Tobias",
        lastName: "Potocek",
    }

    async function handleAddUser() {
        await addUser(user)
        const users = await getUsers()
        setUsers(users)
    }

    return <div>
        <button onClick={() => handleAddUser()}>Add user</button>
        {users.map(user => <div key={user.id}>{user.firstName} {user.lastName}</div>)}
    </div>
}