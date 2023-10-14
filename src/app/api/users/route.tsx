import {addUser, getUsers} from "@/app/api/users/UserRepository";
import User, {parseUserOrderBy, UserOrderBy} from "@/app/common/users/User";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)

    let orderBy: UserOrderBy | null = null

    if (searchParams.has("orderBy")) {
        orderBy = parseUserOrderBy(searchParams.get("orderBy"))

        if (orderBy == null) {
            return new Response("Invalid orderBy", { status: 400 })
        }
    }

    return Response.json(getUsers(orderBy, searchParams.get("search")))
}

export async function POST(request: Request) {
    const user: User = await request.json()
    addUser(user)
    return Response.json(user)
}
