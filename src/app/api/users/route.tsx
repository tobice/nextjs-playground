let counter = 0

export async function GET(request: Request) {
    return Response.json({ counter })
}

export async function POST(request: Request) {
    counter++
    return Response.json({ counter })
}