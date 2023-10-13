import {addUser, getUsers, UserOrderBy} from "@/app/api/users/UserRepository";
import User from "@/app/common/users/User";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)

    let orderBy: UserOrderBy

    if (searchParams.get("orderBy")) {
        switch (searchParams.get("orderBy")) {
            case "firstName": orderBy = UserOrderBy.FirstName; break;
            case "lastName": orderBy = UserOrderBy.LastName; break;
            default: return new Response("Invalid orderBy", { status: 400 })
        }
    }

    return Response.json(getUsers(orderBy))
}

export async function POST(request: Request) {
    const user: User = await request.json()
    addUser(user)
    return Response.json(user)
}
