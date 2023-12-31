'use client'

import useUsers from "@/app/users/useUsers";
import {useRouter, useSearchParams} from "next/navigation";
import SearchForm from "@/app/users/SearchForm";
import useUpdateHrefQuery from "@/app/common/navigation/useUpdateHrefQuery";
import UserTable from "@/app/users/UserTable";
import User, {parseUserOrderBy, UserOrderBy} from "@/app/common/users/User";
import {useRef} from "react";
import UserForm from "@/app/users/UserForm";

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
        addUserModalRef.current?.querySelector("input")?.focus()
    }

    const { users, addUser } = useUsers(orderBy, search)

    const handleAddUser = async (user: User) => {
        await addUser(user)
        addUserModalRef.current?.close()
    }

    return <>
        <div className="flex mb-6 justify-end">
            <div className="mr-3">
                <SearchForm onSubmit={handleSearch} />
            </div>
            <div>
                <button className="btn btn-primary" onClick={handleOpenModal}>
                    Add user
                </button>
            </div>
        </div>

        <dialog className="modal" ref={addUserModalRef}>
            <UserForm onSubmit={handleAddUser} />
        </dialog>

        {users &&
            <UserTable
                users={users}
                orderBy={orderBy}
                onOrderBy={handleOrderBy} />}

    </>
}