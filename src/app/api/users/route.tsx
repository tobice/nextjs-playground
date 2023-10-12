import {addUser, getUsers, User} from "@/app/api/users/UserRepository";

export async function GET(request: Request) {
    return Response.json(getUsers())
}

export async function POST(request: Request) {
    const user: User = await request.json()
    addUser(user)
    return Response.json(user)
}
