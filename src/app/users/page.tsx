'use client'

import useUsers from "@/app/users/useUsers";
import UserForm from "@/app/users/UserForm";
import Link from "next/link";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import SearchForm from "@/app/users/SearchForm";
import useUrl from "@/app/common/navigation/useUrl";

export default function Home() {
    const router = useRouter()
    const pathname: String = usePathname()
    const searchParams = useSearchParams()

    const orderBy = searchParams.get("orderBy") || null
    const search = searchParams.get("search") || null

    const { users, addUser } = useUsers(orderBy, search)

    const handleSearch = (search) => {
        const newSearchParams = new URLSearchParams(searchParams);

        if (search) {
            newSearchParams.set("search", search)
        } else {
            newSearchParams.delete("search")
        }

        const href = pathname + (newSearchParams.size > 0 ? `?${newSearchParams}` : "")
        router.push(href)
    }

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

        <SearchForm onSubmit={handleSearch} />
    </>
}