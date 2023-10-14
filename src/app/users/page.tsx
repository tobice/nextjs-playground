'use client'

import useUsers from "@/app/users/useUsers";
import UserForm from "@/app/users/UserForm";
import {useRouter, useSearchParams} from "next/navigation";
import SearchForm from "@/app/users/SearchForm";
import useUpdateHrefQuery from "@/app/common/navigation/useUpdateHrefQuery";
import UserTable from "@/app/users/UserTable";

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

    const handleOrderBy = (orderBy) => {
        router.push(updateHrefQuery({ orderBy }))
    }

    return <>
        <UserForm onSubmit={addUser}/>

        {users &&
            <UserTable
                users={users}
                orderBy={orderBy}
                onOrderBy={handleOrderBy} />}

        <SearchForm onSubmit={handleSearch} />
    </>
}