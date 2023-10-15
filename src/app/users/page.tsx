'use client'

import useUsers from "@/app/users/useUsers";
import {useRouter, useSearchParams} from "next/navigation";
import SearchForm from "@/app/users/SearchForm";
import useUpdateHrefQuery from "@/app/common/navigation/useUpdateHrefQuery";
import UserTable from "@/app/users/UserTable";
import {parseUserOrderBy, UserOrderBy} from "@/app/common/users/User";
import {useRef} from "react";
import UserFormModal from "@/app/users/UserFormModal";

export default function Home() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const updateHrefQuery = useUpdateHrefQuery()

    const orderBy = parseUserOrderBy(searchParams.get("orderBy"))
    const search = searchParams.get("search")

    const handleSearch = (search: string) => {
        router.push(updateHrefQuery({ search }))
    }

    const handleOrderBy = (orderBy: UserOrderBy) => {
        router.push(updateHrefQuery({ orderBy }))
    }

    const addUserModalRef = useRef<HTMLDialogElement | null>(null)

    const handleOpenModal = () => {
        addUserModalRef.current?.showModal()
        addUserModalRef.current?.querySelector("input").focus()
    }

    const { users, addUser } = useUsers(orderBy, search)

    return <>
        <button className="btn btn-primary" onClick={handleOpenModal}>
            Add user
        </button>

        <UserFormModal onSubmit={addUser} ref={addUserModalRef} />

        {users &&
            <UserTable
                users={users}
                orderBy={orderBy}
                onOrderBy={handleOrderBy} />}

        <SearchForm onSubmit={handleSearch} />
    </>
}