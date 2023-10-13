'use client'

import useUsers from "@/app/users/useUsers";
import UserForm from "@/app/users/UserForm";
import Link from "next/link";
import {useSearchParams} from "next/navigation";

export default function Home() {
    const searchParams = useSearchParams()
    const orderBy = searchParams.get("orderBy") || null

    const { users, addUser } = useUsers(orderBy)

    return <>
        <UserForm onSubmit={addUser}/>
        <p>
            <Link href={{ pathname: '/users', query: { orderBy: "firstName" }}}>
                Order by first name
            </Link>
            <Link href={{ pathname: '/users', query: { orderBy: "lastName" }}}>
                Order by last name
            </Link>
        </p>
        {users && users.map(user => <div key={user.id}>{user.firstName} {user.lastName}</div>)}


    </>
}