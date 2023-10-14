'use client'

import useUsers from "@/app/users/useUsers";
import UserForm from "@/app/users/UserForm";
import Link from "next/link";
import {useRouter, useSearchParams} from "next/navigation";
import SearchForm from "@/app/users/SearchForm";
import useUpdateHrefQuery from "@/app/common/navigation/useUpdateHrefQuery";

export default function Home() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const updateHrefQuery = useUpdateHrefQuery()

    const orderBy = searchParams.get("orderBy") || null
    const search = searchParams.get("search") || null

    const { users, addUser } = useUsers(orderBy, search)

    const handleSearch = (search) => {
        router.push(updateHrefQuery({ search }))
    }

    return <>
        <UserForm onSubmit={addUser}/>
        <p>
            <Link href={updateHrefQuery({ orderBy: "firstName" })}>
                Order by first name
            </Link>
            <Link href={updateHrefQuery({ orderBy: "lastName" })}>
                Order by last name
            </Link>
        </p>

        {users && users.map(user => <div key={user.id}>{user.firstName} {user.lastName}</div>)}

        <SearchForm onSubmit={handleSearch} />
    </>
}